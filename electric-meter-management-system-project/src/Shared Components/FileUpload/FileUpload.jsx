import { useState, useRef } from 'react';
import { toast } from 'react-toastify'; 
import './FileUpload.css';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };


  const uploadFile = async () => {
    const userToken = localStorage.getItem('token')

    try {
      const url = `${BASE_URL}/api/auth/upload-csv`

      const formData = new FormData()
      formData.append("file", selectedFile)


      const response = await axios.post(url, formData ,{
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        }
      })


      toast.success('File uploaded successfully!', {
        position:'top-right',
        autoClose: 3000,
      })

    } catch(error) {
      console.error('File upload failed: ',error.message || error.response)
      
      toast.error(error.response?.data?.message || 'File upload failed', {
        position: 'top-right',
        autoClose: 5000,
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        toast.error('Only .csv files are allowed');
        // clear the input here
        // event.target.reset() 
        return;
      }

      uploadFile()
      // toast.success(`File "${selectedFile.name}" uploaded successfully`);
      // uploadFile()
      setSelectedFile(null);
      event.target.reset();
    } else {
      toast.error('No file selected');

    }
  };

  return (
    <div className="fileupload-container">
      <div className="upload-card">
        <div className="file-title-bar">
          <div className="file-title-heading-wrapper">
            <span className="title">File Upload</span>
            <span className="title-description">
              Upload a file for bulk data entry. File extension should be .csv
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="file-form">
          <div
            className={`drop-zone ${dragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <div>
                <div className="icon-wrapper">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <p>Drag & drop your file here, or click to select a file</p>
              </div>
            )}
            <input
              className="file-input"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="upload-btn" disabled={!selectedFile}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
