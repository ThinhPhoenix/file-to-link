import React, { useState, ChangeEvent } from 'react';
import './App.css';
import axios from 'axios';
import { upload } from './services/upload';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  try{
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
  
        upload(selectedFile)
          .then((res) => {
            console.log('File uploaded successfully');
            const url = res.data.data.secure_url;
            setMessage(url);
            navigator.clipboard.writeText(url)
              .then(() => {
                console.log('URL copied to clipboard');
                console.log(res.data.data.secure_url);
                
              })
              .catch((err) => {
                console.error('Failed to copy URL to clipboard:', err);
              });
          })
          .catch((err: unknown) => {
            if (axios.isAxiosError(err)) {
              console.error('Axios error:', err.response?.data || err.response);
            } else {
              console.error('Unexpected error:', err);
            }
          });
      }
    };
  
    return (
      <div className='all'>
      <p>Upload file below 20mb only.</p>
      <div className="messageBox">
        <div className="fileUploadWrapper">
          <label htmlFor="file">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
              <circle
                strokeWidth="20"
                stroke="#6c6c6c"
                fill="none"
                r="158.5"
                cy="168.5"
                cx="168.5"
              />
              <path
                strokeLinecap="round"
                strokeWidth="25"
                stroke="#6c6c6c"
                d="M167.759 79V259"
              />
              <path
                strokeLinecap="round"
                strokeWidth="25"
                stroke="#6c6c6c"
                d="M79 167.138H259"
              />
            </svg>
            <span className="tooltip">Add an image</span>
          </label>
          <input 
            type="file" 
            id="file" 
            name="file" 
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <input
          placeholder="URL will appear here..."
          type="text"
          id="messageInput"
          value={message || ''}
          readOnly
        />
      </div>
      </div>
    );
  }
  catch {
    return
  }
};

export default App;
