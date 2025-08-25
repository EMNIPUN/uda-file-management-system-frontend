import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import HomePage from './pages/HomePage'
import FilesPage from './pages/FilesPage'
import TrackerPage from './pages/TrackerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="files/all" element={<FilesPage />} />
          <Route path="tracker" element={<TrackerPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
