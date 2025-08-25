import { useState } from 'react';
import { Search, Bell, Settings, User, Menu, X } from 'lucide-react';

const Navbar = ({ toggleMobileSidebar, isMobileSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex md:hidden">
          <button 
            onClick={toggleMobileSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMobileSidebarOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
          </button>
        </div>
        
        <div className="flex-1 max-w-2xl ml-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Search files by ID, cluster, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-sm">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
