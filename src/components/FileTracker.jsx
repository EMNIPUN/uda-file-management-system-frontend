import { useState } from 'react';
import { Search, File, MapPin, Loader2 } from 'lucide-react';

const FileTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('fileId'); // 'fileId', 'location'
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  // Mock file database for demo purposes
  const mockFileDatabase = [
    {
      id: 'FILE-123',
      name: 'Annual Report 2025.pdf',
      type: 'document',
      size: '3.2 MB',
      modifiedDate: 'July 15, 2025',
      cluster: 'C', // Colombo
      location: '89', // Row 8, Column 9
      fullLocation: 'C89'
    },
    {
      id: 'FILE-456',
      name: 'Client Meeting Notes.docx',
      type: 'document',
      size: '1.5 MB',
      modifiedDate: 'July 20, 2025',
      cluster: 'K', // Kandy
      location: '34', // Row 3, Column 4
      fullLocation: 'K34'
    },
    {
      id: 'FILE-789',
      name: 'Project Timeline.xlsx',
      type: 'document',
      size: '2.8 MB',
      modifiedDate: 'July 25, 2025',
      cluster: 'G', // Galle
      location: '12', // Row 1, Column 2
      fullLocation: 'G12'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setError('');
    setIsSearching(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      let result = null;
      
      if (searchBy === 'fileId') {
        result = mockFileDatabase.find(file => file.id.toLowerCase() === searchQuery.toLowerCase());
      } else {
        result = mockFileDatabase.find(file => file.fullLocation.toLowerCase() === searchQuery.toLowerCase());
      }
      
      setSearchResult(result || null);
      if (!result) {
        setError(`No file found with the given ${searchBy === 'fileId' ? 'File ID' : 'Cabin Location'}`);
      }
      
      setIsSearching(false);
    }, 1000);
  };
  
  const renderLocationDetails = (file) => {
    const cluster = file.cluster;
    const row = file.location[0];
    const column = file.location[1];
    
    let clusterName;
    switch (cluster) {
      case 'C':
        clusterName = 'Colombo';
        break;
      case 'K':
        clusterName = 'Kandy';
        break;
      case 'G':
        clusterName = 'Galle';
        break;
      default:
        clusterName = cluster;
    }
    
    return (
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 p-3 rounded-md">
          <h4 className="text-xs text-blue-700 font-semibold">Cluster</h4>
          <p className="text-lg font-medium">{cluster} <span className="text-sm font-normal">({clusterName})</span></p>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <h4 className="text-xs text-green-700 font-semibold">Row</h4>
          <p className="text-lg font-medium">{row}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <h4 className="text-xs text-purple-700 font-semibold">Column</h4>
          <p className="text-lg font-medium">{column}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">File Tracker</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Search for Physical File Location</h3>
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchBy === 'fileId' ? 'Enter File ID...' : 'Enter Cabin Location (e.g., C89)...'}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                </div>
                
                <div>
                  <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="fileId">Search by File ID</option>
                    <option value="location">Search by Cabin Location</option>
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={18} />
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {searchResult && (
        <div className="mt-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">File Information</h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                  <File size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-800">{searchResult.name}</h4>
                  <p className="text-sm text-gray-500">{searchResult.type} • {searchResult.size}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      ID: {searchResult.id}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Modified: {searchResult.modifiedDate}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-red-500" />
                  <h4 className="font-medium text-gray-800">Physical Location</h4>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold bg-gray-800 text-white px-4 py-2 rounded-md">
                      {searchResult.fullLocation}
                    </span>
                  </div>
                  
                  {renderLocationDetails(searchResult)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileTracker;
