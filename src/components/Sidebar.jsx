import { Link } from 'react-router-dom';
import { 
  Home, 
  File, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  Star, 
  Trash2, 
  Share2, 
  Upload, 
  FolderPlus,
  FileSearch
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={18} />, label: 'Home', path: '/' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/files/documents' },
    { icon: <Image size={18} />, label: 'Images', path: '/files/images' },
    { icon: <Video size={18} />, label: 'Videos', path: '/files/videos' },
    { icon: <Music size={18} />, label: 'Audio', path: '/files/audio' },
    { icon: <Archive size={18} />, label: 'Archives', path: '/files/archives' },
    { icon: <FileSearch size={18} className="text-blue-600" />, label: 'File Tracker', path: '/tracker' },
    { icon: <Star size={18} />, label: 'Starred', path: '/starred' },
    { icon: <Share2 size={18} />, label: 'Shared', path: '/shared' },
    { icon: <Trash2 size={18} />, label: 'Trash', path: '/trash' },
  ];

  const storageUsage = 72; // percentage of storage used

  return (
    <div className="h-screen bg-white w-64 border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <File className="text-blue-600" /> UDA Files
        </h1>
      </div>
      
      <div className="p-4 flex space-x-2">
        <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 w-full transition-colors">
          <Upload size={18} /> Upload
        </button>
        <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md py-2 px-3 transition-colors">
          <FolderPlus size={18} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Storage</span>
          <span className="text-gray-800 font-medium">7.2 GB / 10 GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full" 
            style={{ width: `${storageUsage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
