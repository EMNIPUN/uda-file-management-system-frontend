# UDA File Management System - Frontend

A modern, professional file management system built with React and Tailwind CSS, featuring database integration, advanced search/filtering, and comprehensive file operations.

## 🚀 Features

### Core Functionality
- **Database Integration**: Real-time file data from MongoDB backend
- **File Operations**: Create, read, update, and delete files
- **Bulk Operations**: Select and manage multiple files simultaneously
- **Search & Filtering**: Advanced search with multiple filter criteria
- **Statistics Dashboard**: Real-time analytics and file metrics

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional UI**: Modern, clean interface with smooth animations
- **Multiple View Modes**: Grid and list views for different preferences
- **Real-time Updates**: Live data synchronization with the backend
- **Loading States**: Professional loading indicators and error handling

### Advanced Features
- **File Statistics**: Total files, clusters, storage grid, and recent files
- **Advanced Search**: Search by file ID, name, location, or any text
- **Filtering System**: Filter by cluster, row, column, and file ID
- **Bulk Selection**: Select multiple files for batch operations
- **File Upload Modal**: Professional form with validation
- **Notification System**: Success, error, and warning notifications
- **Error Handling**: Comprehensive error states and recovery

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── FileList.jsx          # Main file list component
│   ├── FileCard.jsx          # Individual file card component
│   ├── FileSearch.jsx        # Search and filter component
│   ├── FileStats.jsx         # Statistics dashboard
│   ├── FileUploadModal.jsx   # File creation modal
│   └── Notification.jsx      # Notification system
├── hooks/
│   └── useFiles.js           # Custom hook for file operations
├── pages/
│   └── FilesPage.jsx         # Files page wrapper
└── main.jsx                  # Application entry point
```

## 🔧 Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🎯 Key Components

### FileList Component
The main component that orchestrates the entire file management interface:
- Database integration via `useFiles` hook
- Search and filtering functionality
- Bulk operations management
- View mode switching (grid/list)
- Error handling and loading states

### FileSearch Component
Advanced search and filtering interface:
- Real-time search across file properties
- Advanced filters for cluster, row, column, and file ID
- Collapsible filter panel
- Clear filters functionality
- Refresh data capability

### FileStats Component
Real-time statistics dashboard:
- Total file count
- Cluster distribution
- Storage grid dimensions
- Recent file activity

### FileUploadModal Component
Professional file creation interface:
- Form validation
- Error handling
- Loading states
- Responsive design

## 🔌 API Integration

The system integrates with the backend API endpoints:

- `GET /getallfile` - Fetch all files
- `GET /getfile/:id` - Get specific file
- `POST /createfile` - Create new file
- `PUT /updatefile/:id` - Update file
- `DELETE /deletefile/:id` - Delete file

## 🎨 UI/UX Features

### Professional Design
- Clean, modern interface
- Consistent color scheme
- Smooth transitions and animations
- Responsive grid layouts
- Professional typography

### User Experience
- Intuitive navigation
- Clear visual feedback
- Loading states and progress indicators
- Error recovery mechanisms
- Accessibility considerations

### Interactive Elements
- Hover effects and transitions
- Click feedback
- Keyboard navigation support
- Mobile-friendly touch targets

## 🚀 Performance Optimizations

- **Memoization**: React.memo and useMemo for performance
- **Lazy Loading**: Components loaded on demand
- **Efficient Re-renders**: Optimized state management
- **Debounced Search**: Performance-friendly search implementation

## 🔒 Error Handling

- **Network Errors**: Graceful handling of API failures
- **Validation Errors**: Form validation with user feedback
- **Loading States**: Clear indication of data loading
- **Recovery Options**: Retry mechanisms and fallbacks

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Flexible Grid**: Adaptive layouts for different screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Cross Browser**: Compatible with modern browsers

## 🎯 Future Enhancements

- **File Preview**: Preview files before opening
- **Drag & Drop**: Drag and drop file uploads
- **Keyboard Shortcuts**: Power user keyboard navigation
- **Export Features**: Export file lists and statistics
- **Advanced Analytics**: Detailed file usage analytics
- **User Permissions**: Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.
