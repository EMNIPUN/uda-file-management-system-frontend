import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';

const FileUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fileId: '',
    cluster: '',
    row: '',
    column: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fileId.trim()) {
      newErrors.fileId = 'File ID is required';
    }
    
    if (!formData.cluster.trim()) {
      newErrors.cluster = 'Cluster is required';
    }
    
    if (!formData.row) {
      newErrors.row = 'Row number is required';
    } else if (isNaN(formData.row) || parseInt(formData.row) < 0) {
      newErrors.row = 'Row must be a positive number';
    }
    
    if (!formData.column) {
      newErrors.column = 'Column number is required';
    } else if (isNaN(formData.column) || parseInt(formData.column) < 0) {
      newErrors.column = 'Column must be a positive number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        row: parseInt(formData.row),
        column: parseInt(formData.column)
      });
      
      // Reset form
      setFormData({
        fileId: '',
        cluster: '',
        row: '',
        column: '',
        address: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        fileId: '',
        cluster: '',
        row: '',
        column: '',
        address: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Add New File</h2>
              <p className="text-sm text-gray-600">Enter file details to add to the system</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File ID *
            </label>
            <input
              type="text"
              name="fileId"
              value={formData.fileId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.fileId ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter file ID"
              disabled={loading}
            />
            {errors.fileId && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle size={14} />
                {errors.fileId}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cluster *
            </label>
            <input
              type="text"
              name="cluster"
              value={formData.cluster}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cluster ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter cluster name"
              disabled={loading}
            />
            {errors.cluster && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle size={14} />
                {errors.cluster}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Row *
              </label>
              <input
                type="number"
                name="row"
                value={formData.row}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.row ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                disabled={loading}
              />
              {errors.row && (
                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle size={14} />
                  {errors.row}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Column *
              </label>
              <input
                type="number"
                name="column"
                value={formData.column}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.column ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                disabled={loading}
              />
              {errors.column && (
                <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle size={14} />
                  {errors.column}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.address ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter file address"
              disabled={loading}
            />
            {errors.address && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle size={14} />
                {errors.address}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                'Create File'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
