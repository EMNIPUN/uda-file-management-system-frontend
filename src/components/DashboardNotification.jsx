import { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, X, Clock } from 'lucide-react';

const DashboardNotification = ({ files, loading, error }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(true);

  useEffect(() => {
    const newNotifications = [];

    // System status notification
    if (loading) {
      newNotifications.push({
        id: 'loading',
        type: 'info',
        title: 'Loading Data',
        message: 'Fetching latest file information...',
        icon: Clock
      });
    }

    // Error notification
    if (error) {
      newNotifications.push({
        id: 'error',
        type: 'error',
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your connection.',
        icon: AlertTriangle
      });
    }

    // Success notification when data loads
    if (files.length > 0 && !loading && !error) {
      newNotifications.push({
        id: 'success',
        type: 'success',
        title: 'System Online',
        message: `Successfully loaded ${files.length} files from the database.`,
        icon: CheckCircle
      });
    }

    // Storage capacity warning
    if (files.length > 0) {
      const clusterCount = files.reduce((acc, file) => {
        acc[file.cluster] = (acc[file.cluster] || 0) + 1;
        return acc;
      }, {});

      const maxRow = Math.max(...files.map(f => f.row || 0));
      const maxColumn = Math.max(...files.map(f => f.column || 0));
      const totalSlots = (maxRow + 1) * (maxColumn + 1) * Object.keys(clusterCount).length;
      const capacityUsed = totalSlots > 0 ? (files.length / totalSlots) * 100 : 0;

      if (capacityUsed > 80) {
        newNotifications.push({
          id: 'capacity',
          type: 'warning',
          title: 'Storage Capacity Warning',
          message: `Storage is ${Math.round(capacityUsed)}% full. Consider expanding storage.`,
          icon: AlertTriangle
        });
      }
    }

    // Recent activity notification
    if (files.length > 0) {
      const recentFiles = files.slice(0, 3);
      if (recentFiles.length > 0) {
        newNotifications.push({
          id: 'activity',
          type: 'info',
          title: 'Recent Activity',
          message: `${recentFiles.length} files recently added to the system.`,
          icon: Info
        });
      }
    }

    setNotifications(newNotifications);
  }, [files, loading, error]);

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!showNotifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 rounded-lg border ${getNotificationStyles(notification.type)}`}
        >
          <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
            <notification.icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{notification.title}</p>
            <p className="text-sm mt-1 opacity-90">{notification.message}</p>
          </div>
          <button
            onClick={() => setShowNotifications(false)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardNotification;
