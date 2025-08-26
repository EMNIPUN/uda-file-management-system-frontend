import { useState, useEffect } from 'react';
import FileCard from './FileCard';
import { 
  Grid, 
  List, 
  Folder
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FileList = ({ files = [], folders = [] }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [folderData, setFolderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BACKEND_URL}/api/file/getallfile`);
      const data = await response.json();
      setFolderData(data.folders);
    };
    fetchData();
  }, []);

  console.log(folderData);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Files</h2>
        
        <div className="flex items-center gap-2">
          {/* simple sort placeholder removed for minimal UI */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {folders.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Folders</h3>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : 'grid-cols-1 gap-2'}`}>
            {folders.map((folder) => (
              <div 
                key={folder.id} 
                className={`bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center p-3' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex items-center justify-center p-6 bg-gray-50">
                      <Folder size={24} className="text-yellow-500" />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-800 truncate">{folder.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{folder.items} items</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-gray-50 rounded mr-3">
                      <Folder size={20} className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">{folder.name}</p>
                      <p className="text-xs text-gray-500">{folder.items} items</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {files.length > 0 ? (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Files</h3>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : 'grid-cols-1 gap-2'}`}>
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <Folder size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No files yet</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            Upload your first file or create a folder to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default FileList;
