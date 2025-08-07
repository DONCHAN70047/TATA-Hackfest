import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { UploadedFile } from '../types';
import { insuranceTypes } from '../data/insuranceTypes';
import AiChatInterface from './AiPDFChat';

const PdfUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState('');
  const [activeChatFileId, setActiveChatFileId] = useState<string | null>(null);

  useEffect(() => {
    const firstCompleted = uploadedFiles.find(f => f.status === 'completed');
    if (firstCompleted && !activeChatFileId) {
      setActiveChatFileId(firstCompleted.id);
    }
  }, [uploadedFiles, activeChatFileId]);

  const uploadToBackend = useCallback(async (file: File, fileMeta: UploadedFile) => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('insurance_type', selectedInsuranceType || 'general');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/MLModel/`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');

      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === fileMeta.id
            ? {
                ...f,
                status: 'completed',
                availability: true,
                message: 'Document uploaded successfully. You can now ask questions.'
              }
            : f
        )
      );
    } catch (error) {
      console.error(error);
      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === fileMeta.id
            ? { ...f, status: 'error', message: 'Upload failed' }
            : f
        )
      );
    }
  }, [selectedInsuranceType]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        status: 'uploading',
        insuranceType: selectedInsuranceType || 'general'
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);

      newFiles.forEach((fileMeta, index) => {
        const file = acceptedFiles[index];
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === fileMeta.id
              ? {
                  ...f,
                  status: 'processing'
                }
              : f
          )
        );
        uploadToBackend(file, fileMeta);
      });
    },
    [selectedInsuranceType, uploadToBackend]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const formatFileSize = (bytes: number) => {
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

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeChatFileId === fileId) setActiveChatFileId(null);
  };

  const activeFile = uploadedFiles.find(f => f.id === activeChatFileId);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!activeChatFileId ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upload Insurance Document
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload a PDF document to begin. Once uploaded, you can ask questions about it.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Insurance Type
            </label>
            <select
              value={selectedInsuranceType}
              onChange={e => setSelectedInsuranceType(e.target.value)}
              className="input-field"
            >
              <option value="">Select an insurance type</option>
              {insuranceTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

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
            <p className="text-gray-600">
              Drag & drop a PDF file here, or{' '}
              <span className="text-primary-600 font-medium">click to browse</span>
            </p>
            <p className="text-sm text-gray-500">Only one PDF file allowed</p>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-8 space-y-3">
              {uploadedFiles.map(file => (
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
          )}
        </>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Ask Questions About Your Document
            </h2>
            <p className="text-gray-600">
              You're now chatting about: <strong>{activeFile?.name || 'Unknown document'}</strong>
            </p>
          </div>
          <AiChatInterface fileId={activeChatFileId} />
        </>
      )}
    </div>
  );
};

export default PdfUpload;
