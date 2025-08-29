import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FileUploader = ({ isOpen, onClose }) => {
  const [fileIdValue, setFileIdValue] = useState('');
  const [clusterValue, setClusterValue] = useState('');
  const [rowValue, setRowValue] = useState('');
  const [columnValue, setColumnValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const clusterOptions = [
    { value: 'C', label: 'Colombo (C)' },
    { value: 'K', label: 'Kandy (K)' },
    { value: 'G', label: 'Galle (G)' },
    { value: 'J', label: 'Jaffna (J)' },
    { value: 'A', label: 'Anuradhapura (A)' },
    { value: 'B', label: 'Batticaloa (B)' },
    { value: 'M', label: 'Matara (M)' },
    { value: 'N', label: 'Negombo (N)' },
    { value: 'P', label: 'Polonnaruwa (P)' },
    { value: 'T', label: 'Trincomalee (T)' }
  ];

  const allowedClusters = clusterOptions.map(o => o.value);

  const isValid = (
    fileIdValue.trim() !== '' &&
    allowedClusters.includes(clusterValue) &&
    rowValue !== '' && columnValue !== '' &&
    Number(rowValue) >= 0 && Number(rowValue) <= 9 &&
    Number(columnValue) >= 0 && Number(columnValue) <= 9
  );

  const handleSave = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!isValid) {
      setErrorMessage('Please fill all fields correctly. Row/Column must be 0-9 and cluster valid.');
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(`${BACKEND_URL}/api/file/createfile`, {
        fileId: fileIdValue.trim(),
        cluster: clusterValue,
        row: Number(rowValue),
        column: Number(columnValue),
        address: addressValue.trim() || null
      });
      setSuccessMessage('Saved successfully');
      setFileIdValue('');
      setClusterValue('');
      setRowValue('');
      setColumnValue('');
      setAddressValue('');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Failed to save.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Add File Record</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {errorMessage && (
            <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-100 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-100 text-sm">{successMessage}</div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">File ID</label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Enter unique file ID"
                value={fileIdValue}
                onChange={(e) => setFileIdValue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cluster Name</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                value={clusterValue}
                onChange={(e) => setClusterValue(e.target.value)}
              >
                <option value="">Select a cluster</option>
                {clusterOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Row Number</label>
              <input 
                type="number"
                className="w-[300px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                placeholder="0-9"
                min={0}
                max={9}
                value={rowValue}
                onChange={(e) => setRowValue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Column Number</label>
              <input 
                type="number"
                className="w-[300px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                placeholder="0-9"
                min={0}
                max={9}
                value={columnValue}
                onChange={(e) => setColumnValue(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address (optional)</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Enter address"
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            className={`px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm ${(!isValid || submitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isValid || submitting}
            onClick={handleSave}
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
