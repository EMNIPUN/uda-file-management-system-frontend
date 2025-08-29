import { useState, useEffect, useCallback } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFiles = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${BACKEND_URL}/api/file/getallfile`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our UI expectations
      const transformedFiles = data.map(file => ({
        id: file._id,
        fileId: file.fileId,
        name: `File ${file.fileId}`,
        size: 'Unknown',
        modifiedDate: new Date().toLocaleDateString(),
        cabinLocation: `Cluster: ${file.cluster}, Row: ${file.row}, Column: ${file.column}`,
        address: file.address,
        cluster: file.cluster,
        row: file.row,
        column: file.column,
        type: 'file'
      }));
      
      setFiles(transformedFiles);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshFiles = useCallback(async () => {
    setRefreshing(true);
    await fetchFiles();
    setRefreshing(false);
  }, [fetchFiles]);

  const deleteFile = useCallback(async (fileId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/file/deletefile/${fileId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Remove the file from local state
      setFiles(prev => prev.filter(file => file.id !== fileId));
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting file:', err);
      return false;
    }
  }, []);

  const updateFile = useCallback(async (fileId, updates) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/file/updatefile/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update the file in local state
      setFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, ...updates } : file
      ));
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error updating file:', err);
      return false;
    }
  }, []);

  const createFile = useCallback(async (fileData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/file/createfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Refresh the file list to get the new file
      await fetchFiles();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error creating file:', err);
      return false;
    }
  }, [fetchFiles]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    error,
    refreshing,
    fetchFiles,
    refreshFiles,
    deleteFile,
    updateFile,
    createFile,
  };
};
