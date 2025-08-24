'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', 'error'
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setUploadStatus(null);
      } else {
        toast.error('Please upload a valid CSV or Excel file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setLoading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/tasks/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        toast.success(data.message || 'File uploaded successfully!');
        onUploadSuccess();
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setFile(null);
      } else {
        setUploadStatus('error');
        toast.error(data.message || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-dark-500 transition-colors">
        <FileText className="h-12 w-12 text-dark-500 mx-auto mb-3" />
        <div className="flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sm text-dark-300 hover:text-white"
          >
            <span className="font-medium text-primary-400 hover:text-primary-300">
              Click to <span className='text-[16px] font-bold'>upload</span> 
            </span>{' '}
            or drag and drop
          </label>
          <p className="text-xs text-dark-500 mt-1">
            CSV, XLSX, XLS files only
          </p>
        </div>
      </div>

      {file && (
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-primary-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-white truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-dark-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-dark-400 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="flex items-center p-3 bg-success-500/20 rounded-lg border border-success-500/30">
          <CheckCircle className="h-5 w-5 text-success-400 mr-2" />
          <span className="text-sm text-success-300">File uploaded successfully!</span>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="flex items-center p-3 bg-error-500/20 rounded-lg border border-error-500/30">
          <AlertCircle className="h-5 w-5 text-error-400 mr-2" />
          <span className="text-sm text-error-300">Upload failed. Please try again.</span>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full"
        loading={loading}
      >
        <Upload className="h-4 w-4 mr-2" />
        {loading ? 'Uploading...' : 'Upload and Distribute'}
      </Button>

      <div className="text-xs text-dark-500 mt-4">
        <p className="font-medium mb-1">Required CSV format:</p>
        <p>FirstName, Phone, Notes</p>
      </div>
    </div>
  );
}