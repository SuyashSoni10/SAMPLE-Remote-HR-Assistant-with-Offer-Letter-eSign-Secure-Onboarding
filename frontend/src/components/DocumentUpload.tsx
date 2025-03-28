'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface UploadedFile {
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
}

export const DocumentUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    // Process each file
    acceptedFiles.forEach(file => {
      // Check file type
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only PDF, JPEG, and PNG files are allowed');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Create preview for images
      const preview = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : '/pdf-icon.png';

      setUploadedFiles(prev => [
        ...prev,
        {
          file,
          preview,
          status: 'uploading'
        }
      ]);

      // Simulate file upload
      setTimeout(() => {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === file ? { ...f, status: 'success' } : f
          )
        );
      }, 2000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 5
  });

  const removeFile = (file: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== file));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
        <p className="mt-2 text-gray-600">
          Please upload your identification documents (passport, driver's license, or national ID)
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-500'
          }`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your documents here, or click to select files
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, JPEG, PNG (max 5MB)
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadedFiles.map((uploadedFile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  {uploadedFile.file.type.startsWith('image/') ? (
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <DocumentIcon className="w-16 h-16 text-gray-400" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="mt-1">
                      {uploadedFile.status === 'uploading' ? (
                        <div className="h-1 bg-gray-200 rounded">
                          <div className="h-1 bg-primary-500 rounded w-1/2 animate-[progress_1s_ease-in-out_infinite]" />
                        </div>
                      ) : uploadedFile.status === 'success' ? (
                        <span className="text-xs text-green-600">Upload complete</span>
                      ) : (
                        <span className="text-xs text-red-600">Upload failed</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(uploadedFile.file)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
