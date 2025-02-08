import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/timeCapsule.css";
import { UserContext } from '../UserContext';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const TimeCapsule = () => {
  const { userInfo } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [releaseDate, setReleaseDate] = useState('2024-12-01');
  const [releaseTime, setReleaseTime] = useState('12:00');
  const [title, setTitle] = useState('Some Audio');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleReleaseTimeChange = (event) => {
    setReleaseTime(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileUpload = () => {
    if (!releaseDate || !releaseTime || !title || files.length === 0) {
      toast.error('Please select files, a release date, time, and title!');
      return;
    }

    const fullReleaseDateTime = `${releaseDate} ${releaseTime}`;

    // Create FormData object
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('releaseDateTime', fullReleaseDateTime);
    formData.append('title', title);
    formData.append('userId', userInfo.id);

    // Send all data at once
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4000/timecapsule', true);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        toast.success(`Upload complete! Time Capsule titled "${title}" will open on ${fullReleaseDateTime}`);
      } else {
        toast.error('Upload failed. Please try again.');
      }
    };

    xhr.onerror = () => {
      toast.error('Upload failed: Network error');
    };

    xhr.send(formData);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  return (
    <div className="time-capsule-container">
      <h1>Time Capsule</h1>

      <div className="release-date-time">
        <label>Set Title: </label>
        <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter a title for your time capsule" />

        <label>Set Release Date: </label>
        <input type="date" value={releaseDate} onChange={handleReleaseDateChange} />

        <label>Set Release Time: </label>
        <input type="time" value={releaseTime} onChange={handleReleaseTimeChange} />
      </div>

      <div
        className={`file-upload ${dragActive ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className="upload-box" onClick={() => document.getElementById('fileInput').click()}>
          <p>
            Drop your files here or <span style={{ cursor: 'pointer' }}>browse</span>
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Files Selected:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && <button onClick={handleFileUpload}>Upload Time Capsule</button>}

      <ToastContainer />
    </div>
  );
};

export default TimeCapsule;
