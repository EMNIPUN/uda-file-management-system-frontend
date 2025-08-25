import { useState } from 'react';
import { Search, File, MapPin, Loader2, Database } from 'lucide-react';

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
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <h4 className="text-xs text-primary-700 font-semibold uppercase tracking-wider">Cluster</h4>
          <p className="text-lg font-bold text-gray-900 mt-1">{cluster} <span className="text-sm font-normal text-gray-600">({clusterName})</span></p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="text-xs text-blue-700 font-semibold uppercase tracking-wider">Row</h4>
          <p className="text-lg font-bold text-gray-900 mt-1">{row}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h4 className="text-xs text-green-700 font-semibold uppercase tracking-wider">Column</h4>
          <p className="text-lg font-bold text-gray-900 mt-1">{column}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Database className="text-primary-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">File Location Tracker</h2>
          <p className="text-sm text-gray-500">Find physical file locations by ID or cabin location</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Search for Physical File Location</h3>
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchBy === 'fileId' ? 'Enter File ID...' : 'Enter Cabin Location (e.g., C89)...'}
                      className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>
                
                <div>
                  <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  >
                    <option value="fileId">Search by File ID</option>
                    <option value="location">Search by Cabin Location</option>
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
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
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">File Information</h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <File size={24} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{searchResult.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{searchResult.type} • {searchResult.size}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                      ID: {searchResult.id}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                      Modified: {searchResult.modifiedDate}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-primary-500" />
                  <h4 className="font-semibold text-gray-900">Physical Location</h4>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold bg-primary-500 text-white px-6 py-3 rounded-lg shadow-sm">
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
