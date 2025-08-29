import { 
  File,
  MoreVertical,
  Download,
  Trash2,
  Edit,
  MapPin
} from 'lucide-react';
import { useState } from 'react';

const FileCard = ({ file, onDelete, onUpdate, selected = false, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const getFileIcon = () => {
    return <File size={24} className="text-primary-500" />;
  };



  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action, e) => {
    e.stopPropagation();
    setShowMenu(false);
    
    switch (action) {
      case 'delete':
        if (onDelete && confirm(`Are you sure you want to delete ${file.name}?`)) {
          onDelete(file.id);
        }
        break;
      case 'rename':
        if (onUpdate) {
          const newName = prompt('Enter new name:', file.name);
          if (newName && newName !== file.name) {
            onUpdate(file.id, { name: newName });
          }
        }
        break;
      case 'download':
        // Implement download functionality
        console.log(`Downloading ${file.name}`);
        break;
      default:
        console.log(`${action} file: ${file.name}`);
    }
  };

  return (
    <div className={`bg-white rounded-lg border p-4 hover:shadow-md transition-all cursor-pointer group ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="flex items-center gap-4">
        {onSelect && (
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        )}
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
};

export default FileCard;
