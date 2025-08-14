import { useState } from 'react';
import FileList from '../components/FileList';
import FileUploader from '../components/FileUploader';
import FileTracker from '../components/FileTracker';
import { PlusCircle, Clock, FileSearch } from 'lucide-react';

const HomePage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Mock data for demo
  const recentFiles = [
    {
      id: '1',
      name: 'Project Proposal.docx',
      type: 'document',
      size: '2.5 MB',
      modifiedDate: 'Today, 10:30 AM',
      cabinLocation: 'C89',
      fileId: 'FILE-123'
    },
    {
      id: '2',
      name: 'team-photo.jpg',
      type: 'image',
      size: '4.2 MB',
      modifiedDate: 'Yesterday',
      previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      cabinLocation: 'G12',
      fileId: 'FILE-789'
    },
    {
      id: '3',
      name: 'Quarterly Report.pdf',
      type: 'document',
      size: '1.8 MB',
      modifiedDate: 'Aug 6, 2025',
      cabinLocation: 'K34',
      fileId: 'FILE-456'
    },
    {
      id: '4',
      name: 'product-demo.mp4',
      type: 'video',
      size: '24.5 MB',
      modifiedDate: 'Aug 5, 2025'
    },
    {
      id: '5',
      name: 'design-mockup.png',
      type: 'image',
      size: '3.7 MB',
      modifiedDate: 'Aug 4, 2025',
      previewUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop'
    }
  ];
  
  const quickAccessFolders = [
    {
      id: '1',
      name: 'Documents',
      items: 24
    },
    {
      id: '2',
      name: 'Projects',
      items: 12
    },
    {
      id: '3',
      name: 'Designs',
      items: 18
    },
    {
      id: '4',
      name: 'Photos',
      items: 43
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Home</h1>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={18} />
          <span>Upload</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickAccessFolders.map((folder) => (
              <div 
                key={folder.id} 
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{folder.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{folder.name}</p>
                  <p className="text-xs text-gray-500">{folder.items} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xs font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">John Doe</span> shared <span className="font-medium text-blue-600">Project Proposal.docx</span> with you
                </p>
                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xs font-medium">YOU</span>
              </div>
              <div>
                <p className="text-sm">
                  You uploaded <span className="font-medium text-blue-600">team-photo.jpg</span> and 3 other files
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-xs font-medium">SM</span>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Sarah Miller</span> commented on <span className="font-medium text-blue-600">Quarterly Report.pdf</span>
                </p>
                <p className="text-xs text-gray-500">Aug 6, 2025</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 text-xs font-medium">RJ</span>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Robert Johnson</span> created folder <span className="font-medium text-blue-600">Projects</span>
                </p>
                <p className="text-xs text-gray-500">Aug 5, 2025</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={18} className="text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">Recent Files</h2>
        </div>
        <FileList files={recentFiles} />
      </div>
      
      {/* File Tracker Component */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileSearch size={20} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Cabin File Tracking System</h2>
        </div>
        <FileTracker />
      </div>

      <FileUploader 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
