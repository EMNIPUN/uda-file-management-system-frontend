import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import FileTracker from '../components/FileTracker';
import { PlusCircle, Clock, FileSearch, Database, MapPin, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  

  const stats = [
    { label: 'Total Files', value: '1,247', icon: Database, color: 'primary' },
    { label: 'Active Locations', value: '89', icon: MapPin, color: 'blue' },
    { label: 'Storage Used', value: '7.2 GB', icon: TrendingUp, color: 'green' },
    { label: 'Recent Uploads', value: '23', icon: Clock, color: 'purple' }
  ];

  const mockRecords = [
    { fileId: 'FILE-1001', cluster: 'C', row: '8', column: '9' },
    { fileId: 'FILE-1002', cluster: 'K', row: '3', column: '4' },
    { fileId: 'FILE-1003', cluster: 'G', row: '1', column: '2' },
    { fileId: 'FILE-1004', cluster: 'J', row: '0', column: '5' },
    { fileId: 'FILE-1005', cluster: 'A', row: '9', column: '0' },
    { fileId: 'FILE-1006', cluster: 'B', row: '6', column: '3' },
    { fileId: 'FILE-1007', cluster: 'M', row: '2', column: '7' },
    { fileId: 'FILE-1008', cluster: 'N', row: '4', column: '1' },
    { fileId: 'FILE-1009', cluster: 'P', row: '5', column: '6' },
    { fileId: 'FILE-1010', cluster: 'T', row: '7', column: '8' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">File Management System Overview</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm"
        >
          <PlusCircle size={18} />
          <span>Upload Files</span>
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* File Tracker Component */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileSearch size={20} className="text-primary-500" />
          <h2 className="text-xl font-semibold text-gray-900">File Location Tracker</h2>
        </div>
        <FileTracker />
      </div>
      
      {/* Sample file records */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Database size={18} className="text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900">Sample File Records</h2>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">File ID</th>
                <th className="px-4 py-2 text-left">Cluster</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Row</th>
                <th className="px-4 py-2 text-left">Column</th>
              </tr>
            </thead>
            <tbody>
              {mockRecords.map((r, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="px-4 py-2 font-medium text-gray-900">{r.fileId}</td>
                  <td className="px-4 py-2">{r.cluster}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">{`${r.cluster}${r.row}${r.column}`}</span>
                  </td>
                  <td className="px-4 py-2">{r.row}</td>
                  <td className="px-4 py-2">{r.column}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      

      <FileUploader 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
