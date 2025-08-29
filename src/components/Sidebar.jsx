import { Link } from 'react-router-dom';
import { 
  Home, 
  File, 
  Upload, 
  FileSearch,
  Database
} from 'lucide-react';

const Sidebar = ({ onUploadClick }) => {
  const menuItems = [
    { icon: <Home size={18} />, label: 'Dashboard', path: '/' },
    { icon: <Database size={18} />, label: 'All Files', path: '/files/all' },
    { icon: <FileSearch size={18} />, label: 'File Tracker', path: '/tracker' },
  ];

  const storageUsage = 72; // percentage of storage used

  return (
    <div className="h-screen bg-white w-64 border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <File className="text-primary-500" /> UDA Files
        </h1>
        <p className="text-xs text-gray-500 mt-1">File Management System</p>
      </div>
      
      <div className="p-4">
        <button 
          onClick={onUploadClick}
          className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-2.5 px-4 w-full transition-colors shadow-sm"
        >
          <Upload size={18} /> Upload Files
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
        </div>
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="mb-3 flex justify-between text-sm">
          <span className="text-gray-600 font-medium">Storage</span>
          <span className="text-gray-900 font-semibold">7.2 GB / 10 GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${storageUsage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">72% used</p>
      </div>
    </div>
  );
};

export default Sidebar;
