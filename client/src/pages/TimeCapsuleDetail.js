import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/timeCapsule.css";
import { FaFileAlt } from "react-icons/fa"; // Importing an icon from react-icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TimeCapsuleDetail() {
  const { id } = useParams();
  const [timeCapsule, setTimeCapsule] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/timecapsule/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched time capsule:", data); // Debugging line
        setTimeCapsule(data);
      })
      .catch((err) => console.error("Error fetching time capsule:", err));
  }, [id]);

  if (!timeCapsule) {
    return <p>Loading...</p>;
  }

  return (
    <div className="time-capsule-detail-container">
      <ToastContainer />
      <h2>Time Capsule Details</h2>
      <div className="capsule-detail">
        <h3>{timeCapsule.title || "Untitled Capsule"}</h3>
        <p className="release-date">
          Release Date: {new Date(timeCapsule.scheduled_date).toLocaleString()}
        </p>

        {timeCapsule.description && (
          <div className="capsule-description">
            <h4>Description:</h4>
            <p>{timeCapsule.description}</p>
          </div>
        )}

        {timeCapsule.files && timeCapsule.files.length > 0 ? (
          <div className="files-section">
            <h4>Files:</h4>
            {timeCapsule.files.map((file, index) => (
              <a
                key={index}
                href={`http://localhost:4000${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                <FaFileAlt className="file-icon" /> File {index + 1}
              </a>
            ))}
          </div>
        ) : (
          <p>No files available</p>
        )}
      </div>
    </div>
  );
}
