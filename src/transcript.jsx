import React, { useRef, useState } from 'react';

export default function TranscriptUpload() {
  const fileInput = useRef();
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setUploadStatus('');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileInput.current.files.length) {
      setUploadStatus('Please select a file first.');
      return;
    }
    // Placeholder for actual upload/verification logic
    setUploadStatus('Transcript uploaded! (Blockchain verification not yet implemented)');
  };

  return (
    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        ref={fileInput}
        onChange={handleFileChange}
        style={{ marginBottom: '1rem' }}
      />
      <button
        type="submit"
        style={{
          background: '#005f99',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.5rem 1.2rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Upload Transcript
      </button>
      {fileName && <div style={{ marginTop: '0.5rem', color: '#007acc' }}>Selected: {fileName}</div>}
      {uploadStatus && <div style={{ marginTop: '0.5rem', color: 'green' }}>{uploadStatus}</div>}
    </form>
  );
}