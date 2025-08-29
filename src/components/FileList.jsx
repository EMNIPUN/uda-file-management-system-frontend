import { useState, useEffect, useMemo } from 'react';
import FileCard from './FileCard';
import FileSearch from './FileSearch';
import FileStats from './FileStats';
import FileUploadModal from './FileUploadModal';
import Notification from './Notification';
import { 
  Folder,
  AlertCircle,
  Loader2,
  FileText,
  Download,
  Upload,
  Plus
} from 'lucide-react';
import { useFiles } from '../hooks/useFiles';

const FileList = () => {
  const { files, loading, error, refreshing, refreshFiles, deleteFile, updateFile, createFile } = useFiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter and search files
  const filteredFiles = useMemo(() => {
    let filtered = files;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.fileId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.cabinLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.fileId) {
      filtered = filtered.filter(file => 
        file.fileId.toLowerCase().includes(filters.fileId.toLowerCase())
      );
    }
    if (filters.cluster) {
      filtered = filtered.filter(file => 
        file.cluster.toLowerCase().includes(filters.cluster.toLowerCase())
      );
    }
    if (filters.row) {
      filtered = filtered.filter(file => file.row.toString().includes(filters.row));
    }
    if (filters.column) {
      filtered = filtered.filter(file => file.column.toString().includes(filters.column));
    }

    return filtered;
  }, [files, searchTerm, filters]);

  // Group files by cluster for folder view
  const folders = useMemo(() => {
    const clusterGroups = {};
    filteredFiles.forEach(file => {
      if (!clusterGroups[file.cluster]) {
        clusterGroups[file.cluster] = {
          id: file.cluster,
          name: `Cluster ${file.cluster}`,
          items: 0,
          files: []
        };
      }
      clusterGroups[file.cluster].items++;
      clusterGroups[file.cluster].files.push(file);
    });
    return Object.values(clusterGroups);
  }, [filteredFiles]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFileDelete = async (fileId) => {
    const success = await deleteFile(fileId);
    if (success) {
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
      setNotification({ message: 'File deleted successfully', type: 'success' });
    } else {
      setNotification({ message: 'Failed to delete file', type: 'error' });
    }
  };

  const handleFileUpdate = async (fileId, updates) => {
    const success = await updateFile(fileId, updates);
    if (success) {
      setNotification({ message: 'File updated successfully', type: 'success' });
    } else {
      setNotification({ message: 'Failed to update file', type: 'error' });
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedFiles.length} files?`)) {
      const promises = selectedFiles.map(id => deleteFile(id));
      const results = await Promise.all(promises);
      const successCount = results.filter(Boolean).length;
      
      setSelectedFiles([]);
      setShowBulkActions(false);
      
      if (successCount === selectedFiles.length) {
        setNotification({ message: `${successCount} files deleted successfully`, type: 'success' });
      } else {
        setNotification({ message: `${successCount}/${selectedFiles.length} files deleted`, type: 'warning' });
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(f => f.id));
    }
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  useEffect(() => {
    setShowBulkActions(selectedFiles.length > 0);
  }, [selectedFiles]);

  if (loading && !refreshing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading files...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Error loading files</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={refreshFiles}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
    <div>
          <h1 className="text-2xl font-bold text-gray-900">File Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your files across storage clusters
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
            <Upload size={16} />
            <span className="text-sm font-medium">Import</span>
          </button>
          
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            <span className="text-sm font-medium">Add File</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <FileStats files={files} />

      {/* Search and Filters */}
      <FileSearch 
        onSearch={handleSearch}
        onFilter={handleFilter}
        onRefresh={refreshFiles}
        loading={refreshing}
      />

      {/* Bulk Actions */}
      {showBulkActions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedFiles.length} file(s) selected
              </span>
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                {selectedFiles.length === filteredFiles.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                <FileText size={14} />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Files ({filteredFiles.length})
          </h2>
          
          {refreshing && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 size={14} className="animate-spin" />
              Refreshing...
            </div>
          )}
        </div>
      </div>

      {/* File Content */}
      {filteredFiles.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {filteredFiles.map((file) => (
            <FileCard 
              key={file.id} 
              file={file} 
              viewMode="list"
              onDelete={handleFileDelete}
              onUpdate={handleFileUpdate}
              selected={selectedFiles.includes(file.id)}
              onSelect={() => handleFileSelect(file.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg border border-gray-200">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <FileText size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            {searchTerm || Object.values(filters).some(v => v) ? 'No files found' : 'No files yet'}
          </h3>
          <p className="text-gray-500 text-sm max-w-xs mb-4">
            {searchTerm || Object.values(filters).some(v => v) 
              ? 'Try adjusting your search or filters'
              : 'Upload your first file or create a folder to get started'
            }
          </p>
          {!searchTerm && !Object.values(filters).some(v => v) && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Add First File</span>
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={async (fileData) => {
          const success = await createFile(fileData);
          if (success) {
            setNotification({ message: 'File created successfully', type: 'success' });
          } else {
            setNotification({ message: 'Failed to create file', type: 'error' });
          }
        }}
      />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default FileList;
