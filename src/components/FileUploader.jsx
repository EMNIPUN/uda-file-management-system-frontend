import { useState, useRef } from 'react';
import { X, Upload, FileUp, FileBox } from 'lucide-react';

const FileUploader = ({ isOpen, onClose }) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileLocations, setFileLocations] = useState({});
  const fileInputRef = useRef(null);

  // New state for tracking cabin file information
  const [showCabinInfo, setShowCabinInfo] = useState(false);
  const [activeFileIndex, setActiveFileIndex] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
    e.target.value = null; // Reset file input
  };

  const addFiles = (newFiles) => {
    const updatedFiles = [...files];
    
    newFiles.forEach(file => {
      // Check if file already exists in the list
      if (!files.find(f => f.name === file.name && f.size === file.size)) {
        updatedFiles.push(file);
        
        // Initialize progress for this file
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }));
        
        // Simulate upload progress
        simulateUploadProgress(file.name);
      }
    });
    
    setFiles(updatedFiles);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    
    setUploadProgress(prev => {
      const updated = {...prev};
      delete updated[fileName];
      return updated;
    });
  };

  const simulateUploadProgress = (fileName) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileName]: Math.min(Math.round(progress), 100)
      }));
    }, 500);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Upload Files</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center py-10 px-4">
              <FileUp size={36} className={`${dragging ? 'text-blue-500' : 'text-gray-400'} mb-4`} />
              <p className="text-lg font-medium text-gray-800 mb-1">Drop your files here</p>
              <p className="text-sm text-gray-500 text-center mb-4">
                or click to browse from your computer
              </p>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Upload size={16} />
                Choose Files
              </button>
              <input 
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInput}
                multiple
              />
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Uploading {files.length} file(s)</h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="bg-gray-50 rounded-md p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center uppercase font-medium text-xs text-gray-700">
                          {getFileExtension(file.name).substring(0, 3)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setActiveFileIndex(index);
                            setShowCabinInfo(true);
                          }}
                          className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="Add cabin location"
                        >
                          <FileBox size={16} />
                        </button>
                        <button 
                          onClick={() => removeFile(file.name)}
                          className="p-1 rounded hover:bg-gray-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {fileLocations[file.name] && (
                      <div className="mt-2 bg-blue-50 p-2 rounded-md flex items-center text-xs">
                        <span className="font-medium mr-2">Location:</span> 
                        <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          {fileLocations[file.name].fileId} | 
                          Cluster: {fileLocations[file.name].cluster} | 
                          Cabin: {fileLocations[file.name].cabin}
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                          style={{ width: `${uploadProgress[file.name] || 0}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs text-right">
                        {uploadProgress[file.name] || 0}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Cabin location modal */}
          {showCabinInfo && activeFileIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Add Cabin Location
                  </h3>
                  <button 
                    onClick={() => setShowCabinInfo(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      File ID
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter file ID"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cluster
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., C for Colombo"
                        maxLength={1}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter single letter (e.g., C for Colombo)
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cabin Location
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Row"
                          min={0}
                          max={9}
                        />
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Column"
                          min={0}
                          max={9}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Row (0-9) and Column (0-9)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Format Example:</span> C89
                    </p>
                    <p className="text-sm text-blue-700">
                      C = Cluster, 8 = Row, 9 = Column
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={() => setShowCabinInfo(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => {
                      const fileName = files[activeFileIndex]?.name;
                      if (fileName) {
                        // In a real application, you'd get these values from the input fields
                        // For now we're just setting example values
                        setFileLocations(prev => ({
                          ...prev,
                          [fileName]: {
                            fileId: 'FILE-' + Math.floor(Math.random() * 1000),
                            cluster: 'C',
                            cabin: '89'
                          }
                        }));
                      }
                      setShowCabinInfo(false);
                    }}
                  >
                    Save Location
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={files.length === 0}
          >
            Upload {files.length > 0 ? `(${files.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
