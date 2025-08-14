import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  File,
  MoreVertical,
  Download,
  Trash2,
  Share2,
  Edit,
  Star,
  MapPin
} from 'lucide-react';
import { useState } from 'react';

const FileCard = ({ file }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const getFileIcon = () => {
    switch (file.type) {
      case 'document':
        return <FileText size={24} className="text-blue-500" />;
      case 'image':
        return <Image size={24} className="text-green-500" />;
      case 'video':
        return <Video size={24} className="text-red-500" />;
      case 'audio':
        return <Music size={24} className="text-purple-500" />;
      case 'archive':
        return <Archive size={24} className="text-yellow-500" />;
      default:
        return <File size={24} className="text-gray-500" />;
    }
  };

  const getFilePreview = () => {
    if (file.type === 'image' && file.previewUrl) {
      return (
        <div className="relative w-full pt-[100%]">
          <img 
            src={file.previewUrl} 
            alt={file.name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-md"
          />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-t-md">
          {getFileIcon()}
        </div>
      );
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action, e) => {
    e.stopPropagation();
    setShowMenu(false);
    console.log(`${action} file: ${file.name}`);
    // Implement actual action handling
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
      {getFilePreview()}
      
      <div className="p-3 relative">
        <div className="flex items-start justify-between">
          <div className="overflow-hidden">
            <p className="font-medium text-sm text-gray-800 truncate" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {file.size} • {file.modifiedDate}
            </p>
            {file.cabinLocation && (
              <div className="flex items-center mt-1">
                <MapPin size={12} className="text-red-500 mr-1" />
                <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                  Cabin: {file.cabinLocation}
                </span>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={toggleMenu} 
              className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 focus:outline-none transition-opacity"
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <ul className="py-1">
                  <li>
                    <button 
                      onClick={(e) => handleMenuAction('download', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Download size={16} /> Download
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={(e) => handleMenuAction('share', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Share2 size={16} /> Share
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={(e) => handleMenuAction('star', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Star size={16} /> Add to Starred
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={(e) => handleMenuAction('rename', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Edit size={16} /> Rename
                    </button>
                  </li>
                  <li className="border-t border-gray-200">
                    <button 
                      onClick={(e) => handleMenuAction('delete', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
