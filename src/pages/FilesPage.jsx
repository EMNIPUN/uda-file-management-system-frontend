import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FileList from '../components/FileList';
import FileUploader from '../components/FileUploader';
import { 
  PlusCircle, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive 
} from 'lucide-react';

const FilesPage = () => {
  const { type } = useParams();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const getPageTitle = () => {
    switch (type) {
      case 'documents':
        return { title: 'Documents', icon: <FileText size={24} className="text-blue-500" /> };
      case 'images':
        return { title: 'Images', icon: <Image size={24} className="text-green-500" /> };
      case 'videos':
        return { title: 'Videos', icon: <Video size={24} className="text-red-500" /> };
      case 'audio':
        return { title: 'Audio', icon: <Music size={24} className="text-purple-500" /> };
      case 'archives':
        return { title: 'Archives', icon: <Archive size={24} className="text-yellow-500" /> };
      default:
        return { title: 'Files', icon: <FileText size={24} className="text-blue-500" /> };
    }
  };
  
  // Mock data for demo
  const filesByType = {
    documents: [
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
        modifiedDate: 'Yesterday'
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
        modifiedDate: 'Aug 3, 2025'
      }
    ],
    images: [
      {
        id: '1',
        name: 'team-photo.jpg',
        type: 'image',
        size: '4.2 MB',
        modifiedDate: 'Yesterday',
        previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop'
      },
      {
        id: '2',
        name: 'design-mockup.png',
        type: 'image',
        size: '3.7 MB',
        modifiedDate: 'Aug 4, 2025',
        previewUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop'
      },
      {
        id: '3',
        name: 'product-banner.jpg',
        type: 'image',
        size: '2.8 MB',
        modifiedDate: 'Aug 2, 2025',
        previewUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop'
      },
      {
        id: '4',
        name: 'logo.png',
        type: 'image',
        size: '0.8 MB',
        modifiedDate: 'Jul 29, 2025',
        previewUrl: 'https://images.unsplash.com/photo-1618004652321-13a63e576b80?w=800&auto=format&fit=crop'
      }
    ],
    videos: [
      {
        id: '1',
        name: 'product-demo.mp4',
        type: 'video',
        size: '24.5 MB',
        modifiedDate: 'Aug 5, 2025'
      },
      {
        id: '2',
        name: 'tutorial.mp4',
        type: 'video',
        size: '45.2 MB',
        modifiedDate: 'Jul 28, 2025'
      }
    ],
    audio: [
      {
        id: '1',
        name: 'interview.mp3',
        type: 'audio',
        size: '12.8 MB',
        modifiedDate: 'Jul 25, 2025'
      }
    ],
    archives: [
      {
        id: '1',
        name: 'backup.zip',
        type: 'archive',
        size: '45.2 MB',
        modifiedDate: 'Aug 1, 2025'
      },
      {
        id: '2',
        name: 'assets.rar',
        type: 'archive',
        size: '32.1 MB',
        modifiedDate: 'Jul 22, 2025'
      }
    ]
  };

  const foldersByType = {
    documents: [
      {
        id: '1',
        name: 'Reports',
        items: 8
      },
      {
        id: '2',
        name: 'Contracts',
        items: 12
      }
    ],
    images: [
      {
        id: '1',
        name: 'Marketing',
        items: 16
      },
      {
        id: '2',
        name: 'Product Photos',
        items: 32
      }
    ],
    videos: [
      {
        id: '1',
        name: 'Tutorials',
        items: 5
      }
    ],
    audio: [
      {
        id: '1',
        name: 'Podcasts',
        items: 7
      }
    ],
    archives: []
  };
  
  const pageInfo = getPageTitle();
  const files = filesByType[type] || [];
  const folders = foldersByType[type] || [];
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {pageInfo.icon}
          <h1 className="text-2xl font-bold text-gray-800">{pageInfo.title}</h1>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={18} />
          <span>Upload</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-5">
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
