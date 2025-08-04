import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { UploadedFile } from '../types';
import { insuranceTypes } from '../data/insuranceTypes';

const PdfUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      status: 'uploading' as const,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach((file) => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  status: 'processing' as const,
                  insuranceType: selectedInsuranceType || 'general'
                }
              : f
          )
        );

        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { 
                    ...f, 
                    status: 'completed' as const,
                    availability: Math.random() > 0.3, // 70% success rate
                    message: Math.random() > 0.3 
                      ? 'Insurance coverage available! Contact us for details.' 
                      : 'Additional documentation required for verification.'
                  }
                : f
            )
          );
        }, 2000);
      }, 1000);
    });
  }, [selectedInsuranceType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'processing':
        return <Loader className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Insurance Documents
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your insurance documents in PDF format to check coverage availability and get instant verification.
        </p>
      </div>

      {/* Insurance Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Insurance Type
        </label>
        <select
          value={selectedInsuranceType}
          onChange={(e) => setSelectedInsuranceType(e.target.value)}
          className="input-field"
        >
          <option value="">Select an insurance type</option>
          {insuranceTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        {isDragActive ? (
          <p className="text-primary-600 font-medium">Drop the PDF files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Drag & drop PDF files here, or <span className="text-primary-600 font-medium">click to browse</span>
            </p>
            <p className="text-sm text-gray-500">Supports PDF files only</p>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="card flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.uploadedAt.toLocaleTimeString()}
                    </p>
                    {file.insuranceType && (
                      <p className="text-xs text-primary-600 font-medium">
                        {insuranceTypes.find(t => t.id === file.insuranceType)?.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file.status)}
                    <span className="text-sm text-gray-600">{getStatusText(file.status)}</span>
                  </div>
                  
                  {file.status === 'completed' && file.message && (
                    <div className={`text-sm px-3 py-1 rounded-full ${
                      file.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {file.message}
                    </div>
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload Instructions</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Ensure your PDF files are clear and legible</li>
          <li>• Include all relevant insurance documents</li>
          <li>• Maximum file size: 10MB per file</li>
          <li>• Processing time: 2-3 minutes per document</li>
          <li>• You'll receive instant feedback on coverage availability</li>
        </ul>
      </div>
    </div>
  );
};

export default PdfUpload; 