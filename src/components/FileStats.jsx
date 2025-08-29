import { 
  FileText, 
  MapPin, 
  Database, 
  TrendingUp,
  Clock,
  Grid3X3
} from 'lucide-react';

const FileStats = ({ files = [] }) => {
  const stats = {
    totalFiles: files.length,
    totalClusters: new Set(files.map(f => f.cluster)).size,
    totalRows: new Set(files.map(f => f.row)).size,
    totalColumns: new Set(files.map(f => f.column)).size,
    recentFiles: files.filter(f => {
      const fileDate = new Date(f.modifiedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return fileDate > weekAgo;
    }).length
  };

  const statCards = [
    {
      title: 'Total Files',
      value: stats.totalFiles,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Clusters',
      value: stats.totalClusters,
      icon: Database,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Storage Grid',
      value: `${stats.totalRows} × ${stats.totalColumns}`,
      icon: Grid3X3,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Recent Files',
      value: stats.recentFiles,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon size={24} className={stat.textColor} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileStats;
