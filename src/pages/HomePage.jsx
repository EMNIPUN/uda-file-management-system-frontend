import { useState, useEffect } from 'react';
import { useFiles } from '../hooks/useFiles';
import FileTracker from '../components/FileTracker';
import StorageGrid from '../components/StorageGrid';
import Analytics from '../components/Analytics';
import DashboardNotification from '../components/DashboardNotification';
import { 
  Clock, 
  FileSearch, 
  Database, 
  MapPin, 
  TrendingUp, 
  Users, 
  FolderOpen, 
  AlertTriangle,
  BarChart3,
  Activity,
  RefreshCw,
  Plus,
  Download,
  Upload,
  Settings,
  Bell,
  Grid3X3,
  Eye,
  EyeOff
} from 'lucide-react';

const HomePage = () => {
  const { files, loading, error, refreshFiles } = useFiles();
  const [recentActivity, setRecentActivity] = useState([]);
  const [clusterStats, setClusterStats] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showStorageGrid, setShowStorageGrid] = useState(true);

  // Calculate real statistics from files data
  useEffect(() => {
    if (files.length > 0) {
      // Calculate cluster distribution
      const clusterCount = files.reduce((acc, file) => {
        acc[file.cluster] = (acc[file.cluster] || 0) + 1;
        return acc;
      }, {});

      // Calculate storage grid dimensions
      const maxRow = Math.max(...files.map(f => f.row || 0));
      const maxColumn = Math.max(...files.map(f => f.column || 0));
      const uniqueClusters = Object.keys(clusterCount).length;

      setClusterStats({
        totalFiles: files.length,
        uniqueClusters,
        maxRow: maxRow + 1,
        maxColumn: maxColumn + 1,
        clusterDistribution: clusterCount
      });

      // Generate recent activity (last 5 files)
      const recent = files.slice(0, 5).map(file => ({
        id: file.id,
        action: 'File Added',
        fileId: file.fileId,
        location: `${file.cluster}${file.row}${file.column}`,
        timestamp: new Date().toISOString(),
        type: 'add'
      }));
      setRecentActivity(recent);
    }
  }, [files]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshFiles();
    setIsRefreshing(false);
  };

  const getClusterName = (cluster) => {
    const clusterNames = {
      'C': 'Colombo',
      'K': 'Kandy', 
      'G': 'Galle',
      'J': 'Jaffna',
      'A': 'Anuradhapura',
      'B': 'Batticaloa',
      'M': 'Matara',
      'N': 'Negombo',
      'P': 'Polonnaruwa',
      'T': 'Trincomalee'
    };
    return clusterNames[cluster] || cluster;
  };

  const stats = [
    { 
      label: 'Total Files', 
      value: clusterStats.totalFiles || 0, 
      icon: Database, 
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      label: 'Active Clusters', 
      value: clusterStats.uniqueClusters || 0, 
      icon: MapPin, 
      color: 'green',
      change: '+3',
      changeType: 'positive'
    },
    { 
      label: 'Storage Grid', 
      value: `${clusterStats.maxRow || 0}×${clusterStats.maxColumn || 0}`, 
      icon: BarChart3, 
      color: 'purple',
      change: 'Updated',
      changeType: 'neutral'
    },
    { 
      label: 'Recent Activity', 
      value: recentActivity.length, 
      icon: Activity, 
      color: 'orange',
      change: 'Live',
      changeType: 'positive'
    }
  ];

  const topClusters = Object.entries(clusterStats.clusterDistribution || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([cluster, count]) => ({
      cluster,
      name: getClusterName(cluster),
      count,
      percentage: Math.round((count / clusterStats.totalFiles) * 100)
    }));

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">File Management System Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            Add File
          </button>
        </div>
      </div>

      {/* System Notifications */}
      <DashboardNotification files={files} loading={loading} error={error} />

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            <p className="text-red-700 font-medium">Error loading data</p>
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* File Tracker - Takes 2 columns */}
      <div className="lg:col-span-2">
        <FileTracker />
      </div>

      {/* View Toggle Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showAnalytics 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showAnalytics ? <Eye size={16} /> : <EyeOff size={16} />}
            Analytics
          </button>
          <button
            onClick={() => setShowStorageGrid(!showStorageGrid)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showStorageGrid 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showStorageGrid ? <Eye size={16} /> : <EyeOff size={16} />}
            Storage Grid
          </button>
        </div>
        
        {/* Cluster Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by Cluster:</span>
          <select
            value={selectedCluster || ''}
            onChange={(e) => setSelectedCluster(e.target.value || null)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Clusters</option>
            {Object.keys(clusterStats.clusterDistribution || {}).map(cluster => (
              <option key={cluster} value={cluster}>
                {getClusterName(cluster)} ({cluster})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 size={24} className="text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
          </div>
          <Analytics files={files} />
        </div>
      )}

      {/* Storage Grid Section */}
      {showStorageGrid && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Grid3X3 size={24} className="text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Storage Grid Visualization</h2>
          </div>
          <StorageGrid files={files} selectedCluster={selectedCluster} />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Cluster Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={20} className="text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">Top Clusters</h3>
            </div>
            <div className="space-y-3">
              {topClusters.map((cluster, index) => (
                <div key={cluster.cluster} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">{cluster.cluster}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{cluster.name}</p>
                      <p className="text-xs text-gray-500">{cluster.count} files</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{cluster.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      File {activity.fileId} at {activity.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Upload size={16} />
                Upload Files
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Download size={16} />
                Export Data
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={16} />
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
