import { useState } from 'react';
import FileList from '../components/FileList';
import FileUploader from '../components/FileUploader';
import { 
  PlusCircle, 
  Database
} from 'lucide-react';

const FilesPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const getPageTitle = () => ({ title: 'All Files', icon: <Database size={24} className="text-primary-500" /> });
  
  // Mock data for demo (documents only)
  const allFiles = [
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
      name: 'Meeting Notes.docx',
      type: 'document',
      size: '1.2 MB',
      modifiedDate: 'Yesterday',
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
      name: 'User Manual.pdf',
      type: 'document',
      size: '4.3 MB',
      modifiedDate: 'Aug 3, 2025',
      cabinLocation: 'A56',
      fileId: 'FILE-234'
    }
  ];

  const folders = [
    {
      id: '1',
      name: 'Documents',
      items: 24
    },
    {
      id: '2',
      name: 'Projects',
      items: 12
    }
  ];
  
  const pageInfo = getPageTitle();
  const files = allFiles;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            {pageInfo.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pageInfo.title}</h1>
            <p className="text-sm text-gray-500">Manage and organize your files</p>
          </div>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm"
        >
          <PlusCircle size={18} />
          <span>Upload Files</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <FileList files={files} folders={folders} />
      </div>

      <FileUploader 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default FilesPage;
