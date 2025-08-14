import FileTracker from '../components/FileTracker';
import { FileSearch } from 'lucide-react';

const TrackerPage = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FileSearch size={24} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">File Tracking System</h1>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cabin File Tracking</h2>
        <p className="text-gray-600 mb-4">
          Use this system to locate physical files stored in cabins throughout the organization. 
          You can search by File ID or directly by Cabin Location.
        </p>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-blue-700">
          <h3 className="font-medium mb-1">How to read cabin locations:</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>First letter</strong>: Cluster name (e.g., 'C' for Colombo)</li>
            <li><strong>First digit</strong>: Row number (0-9)</li>
            <li><strong>Second digit</strong>: Column number (0-9)</li>
            <li>Example: <strong>C89</strong> = Colombo cluster, Row 8, Column 9</li>
          </ul>
        </div>
      </div>
      
      <FileTracker />
      
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cluster Legend</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-md p-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-700 font-bold">C</span>
            </div>
            <h3 className="font-medium">Colombo Cluster</h3>
            <p className="text-sm text-gray-500 mt-1">Main office building, floors 1-3</p>
          </div>
          <div className="border border-gray-200 rounded-md p-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-green-700 font-bold">K</span>
            </div>
            <h3 className="font-medium">Kandy Cluster</h3>
            <p className="text-sm text-gray-500 mt-1">Regional office, basement archive</p>
          </div>
          <div className="border border-gray-200 rounded-md p-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-yellow-700 font-bold">G</span>
            </div>
            <h3 className="font-medium">Galle Cluster</h3>
            <p className="text-sm text-gray-500 mt-1">Satellite office, records room</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
