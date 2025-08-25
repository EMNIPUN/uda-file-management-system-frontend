import FileTracker from '../components/FileTracker';
import { FileSearch, Info } from 'lucide-react';

const TrackerPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-100 rounded-lg">
          <FileSearch size={24} className="text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File Tracking System</h1>
          <p className="text-sm text-gray-500">Locate physical files across all storage locations</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Info size={20} className="text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900">Cabin File Tracking</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Use this system to locate physical files stored in cabins throughout the organization. 
          You can search by File ID or directly by Cabin Location.
        </p>
        <div className="bg-primary-50 border border-primary-200 p-4 rounded-lg text-primary-700">
          <h3 className="font-semibold mb-2">How to read cabin locations:</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>First letter</strong>: Cluster name (e.g., 'C' for Colombo)</li>
            <li><strong>First digit</strong>: Row number (0-9)</li>
            <li><strong>Second digit</strong>: Column number (0-9)</li>
            <li>Example: <strong>C89</strong> = Colombo cluster, Row 8, Column 9</li>
          </ul>
        </div>
      </div>
      
      <FileTracker />
      
      {/* Legend removed for minimalism */}
    </div>
  );
};

export default TrackerPage;
