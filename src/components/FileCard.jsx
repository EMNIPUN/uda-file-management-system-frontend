import { 
  File,
  MoreVertical,
  Download,
  Trash2,
  Edit,
  MapPin
} from 'lucide-react';
import { useState } from 'react';

const FileCard = ({ file, viewMode = 'grid' }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const getFileIcon = () => {
    return <File size={24} className="text-primary-500" />;
  };

  const getFilePreview = () => {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-t-lg">
        {getFileIcon()}
      </div>
    );
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

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              {getFileIcon()}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-sm text-gray-900 truncate" title={file.name}>
                {file.name}
              </p>
              {file.fileId && (
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                  {file.fileId}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {file.size} • {file.modifiedDate}
            </p>
            {file.cabinLocation && (
              <div className="flex items-center mt-2">
                <MapPin size={12} className="text-primary-500 mr-1" />
                <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded font-medium">
                  Location: {file.cabinLocation}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={toggleMenu} 
                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 focus:outline-none transition-all"
              >
                <MoreVertical size={16} className="text-gray-500" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <ul className="py-2">
                    <li>
                      <button 
                        onClick={(e) => handleMenuAction('download', e)} 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                      >
                        <Download size={16} /> Download
                      </button>
                    </li>
                    
                    <li>
                      <button 
                        onClick={(e) => handleMenuAction('rename', e)} 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                      >
                        <Edit size={16} /> Rename
                      </button>
                    </li>
                    <li className="border-t border-gray-200">
                      <button 
                        onClick={(e) => handleMenuAction('delete', e)} 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
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
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group">
      {getFilePreview()}
      
      <div className="p-4 relative">
        <div className="flex items-start justify-between">
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-sm text-gray-900 truncate" title={file.name}>
                {file.name}
              </p>
              {file.fileId && (
                <span className="text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                  {file.fileId}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {file.size} • {file.modifiedDate}
            </p>
            {file.cabinLocation && (
              <div className="flex items-center mt-2">
                <MapPin size={12} className="text-primary-500 mr-1" />
                <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded font-medium">
                  {file.cabinLocation}
                </span>
              </div>
            )}
          </div>
          
          <div className="relative flex-shrink-0">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 focus:outline-none transition-all"
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <ul className="py-2">
                  <li>
                    <button 
                      onClick={(e) => handleMenuAction('download', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                    >
                      <Download size={16} /> Download
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={(e) => handleMenuAction('rename', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                    >
                      <Edit size={16} /> Rename
                    </button>
                  </li>
                  <li className="border-t border-gray-200">
                    <button 
                      onClick={(e) => handleMenuAction('delete', e)} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
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
