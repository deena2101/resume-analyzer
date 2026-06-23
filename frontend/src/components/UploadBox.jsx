import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

const UploadBox = ({ file, setFile, title = "Upload Resume" }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  if (file) {
    return (
      <div className="glass-card flex items-center justify-between p-4 border-primary/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 text-primary rounded-lg">
            <FileIcon size={24} />
          </div>
          <div>
            <p className="font-medium text-text">{file.name}</p>
            <p className="text-sm text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button 
          onClick={() => setFile(null)}
          className="p-2 hover:bg-surface rounded-full text-muted hover:text-danger transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div 
      {...getRootProps()} 
      className={`glass-card border-2 border-dashed cursor-pointer text-center p-10 transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-surface hover:border-primary/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 bg-surface rounded-full mb-4 text-primary">
          <UploadCloud size={32} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted text-sm max-w-xs mx-auto mb-4">
          Drag & drop your file here, or click to browse. Supports PDF, DOCX, and TXT.
        </p>
        <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium">
          Browse Files
        </span>
      </div>
    </div>
  );
};

export default UploadBox;
