// import { useState } from 'react'
// import './FileUpload.css'

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null)

//   const handleFileChange = (event) => {
//     const file = event.target.files[0] 
//     setSelectedFile(file)
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault() 
//     if (selectedFile) {
//       console.log("File selected:", selectedFile.name) 
//       setSelectedFile(null)
//       event.target.reset()
//     } else {
//       console.log("No file selected")
//     }
//   }

//   return (
//     <div className='fileupload-container'>
//       <div className='title-bar'>
//       <div className='title-heading-wrapper'>
//           <span className="title">File Upload</span>
//           <span className='title-description'>Upload a file for bulk data entry. File extension should be .csv</span>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className='file-form'>
//         <div className='file-input-wrapper'>
//           <input 
//             className='file-input'
//             type='file'
//             onChange={handleFileChange}
//           />
//         </div>

//         <button
//           type='submit'
//           className='upload-btn'
//           disabled={!selectedFile} 
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   )
// }
// export default FileUpload


import { useState, useRef } from 'react';
import './FileUpload.css';

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
    if (file) setSelectedFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log('File selected:', selectedFile.name);
      setSelectedFile(null);
      event.target.reset();
    } else {
      console.log('No file selected');
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
                <div className='icon-wrapper'>
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
