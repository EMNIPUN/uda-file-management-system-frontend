import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Calendar, Clock } from 'lucide-react';

const Analytics = ({ files }) => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    if (files.length > 0) {
      // Calculate cluster distribution
      const clusterDistribution = files.reduce((acc, file) => {
        acc[file.cluster] = (acc[file.cluster] || 0) + 1;
        return acc;
      }, {});

      // Calculate row and column distribution
      const rowDistribution = files.reduce((acc, file) => {
        acc[file.row] = (acc[file.row] || 0) + 1;
        return acc;
      }, {});

      const columnDistribution = files.reduce((acc, file) => {
        acc[file.column] = (acc[file.column] || 0) + 1;
        return acc;
      }, {});

      // Calculate storage efficiency
      const maxRow = Math.max(...files.map(f => f.row || 0));
      const maxColumn = Math.max(...files.map(f => f.column || 0));
      const totalSlots = (maxRow + 1) * (maxColumn + 1) * Object.keys(clusterDistribution).length;
      const efficiency = totalSlots > 0 ? Math.round((files.length / totalSlots) * 100) : 0;

      // Calculate most active locations
      const locationCount = files.reduce((acc, file) => {
        const location = `${file.cluster}${file.row}${file.column}`;
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {});

      const topLocations = Object.entries(locationCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([location, count]) => ({ location, count }));

      setAnalytics({
        clusterDistribution,
        rowDistribution,
        columnDistribution,
        efficiency,
        topLocations,
        totalFiles: files.length,
        uniqueClusters: Object.keys(clusterDistribution).length,
        maxRow: maxRow + 1,
        maxColumn: maxColumn + 1
      });
    }
  }, [files]);

  const getClusterName = (cluster) => {
    const names = {
      'C': 'Colombo', 'K': 'Kandy', 'G': 'Galle', 'J': 'Jaffna', 'A': 'Anuradhapura',
      'B': 'Batticaloa', 'M': 'Matara', 'N': 'Negombo', 'P': 'Polonnaruwa', 'T': 'Trincomalee'
    };
    return names[cluster] || cluster;
  };

  const getClusterColor = (cluster) => {
    const colors = {
      'C': 'bg-blue-500', 'K': 'bg-green-500', 'G': 'bg-purple-500', 'J': 'bg-yellow-500',
      'A': 'bg-red-500', 'B': 'bg-indigo-500', 'M': 'bg-pink-500', 'N': 'bg-orange-500',
      'P': 'bg-teal-500', 'T': 'bg-cyan-500'
    };
    return colors[cluster] || 'bg-gray-500';
  };

  if (!analytics.totalFiles) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="text-center text-gray-500">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No data available for analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Files</p>
              <p className="text-3xl font-bold">{analytics.totalFiles}</p>
            </div>
            <BarChart3 size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Clusters</p>
              <p className="text-3xl font-bold">{analytics.uniqueClusters}</p>
            </div>
            <PieChart size={32} className="text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Storage Efficiency</p>
              <p className="text-3xl font-bold">{analytics.efficiency}%</p>
            </div>
            <TrendingUp size={32} className="text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Grid Size</p>
              <p className="text-3xl font-bold">{analytics.maxRow}×{analytics.maxColumn}</p>
            </div>
            <Activity size={32} className="text-orange-200" />
          </div>
        </div>
      </div>

      {/* Cluster Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <PieChart size={20} className="text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Cluster Distribution</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {Object.entries(analytics.clusterDistribution || {})
              .sort(([,a], [,b]) => b - a)
              .map(([cluster, count]) => {
                const percentage = Math.round((count / analytics.totalFiles) * 100);
                return (
                  <div key={cluster} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${getClusterColor(cluster)}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getClusterName(cluster)}</p>
                        <p className="text-xs text-gray-500">{cluster} Cluster</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{count}</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
                {Object.entries(analytics.clusterDistribution || {}).map(([cluster, count], index, array) => {
                  const percentage = (count / analytics.totalFiles) * 100;
                  const circumference = 2 * Math.PI * 14;
                  const strokeDasharray = (percentage / 100) * circumference;
                  const strokeDashoffset = array.slice(0, index).reduce((acc, [, c]) => {
                    return acc - ((c / analytics.totalFiles) * 100 / 100) * circumference;
                  }, circumference);
                  
                  return (
                    <circle
                      key={cluster}
                      cx="16"
                      cy="16"
                      r="14"
                      stroke={getClusterColor(cluster).replace('bg-', '').split('-')[0]}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">{analytics.totalFiles}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">Most Active Locations</h3>
        </div>
        <div className="space-y-4">
          {analytics.topLocations?.map((location, index) => (
            <div key={location.location} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Location {location.location}</p>
                  <p className="text-xs text-gray-500">{location.count} files stored</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(location.count / Math.max(...analytics.topLocations.map(l => l.count))) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row and Column Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Row Distribution</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(analytics.rowDistribution || {})
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([row, count]) => (
                <div key={row} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Row {row}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(count / Math.max(...Object.values(analytics.rowDistribution || {}))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Column Distribution</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(analytics.columnDistribution || {})
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([column, count]) => (
                <div key={column} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Column {column}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(count / Math.max(...Object.values(analytics.columnDistribution || {}))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
