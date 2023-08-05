import React from 'react';
import axios from 'axios';
import '../styles/styles.css';

axios.defaults.baseURL = 'http://localhost:5000';

const MediaList = ({ mediaItems, setMediaItems, selectedState }) => {
  const handleRemoveMedia = (id) => {
    axios.delete(`/api/media/${id}`)
      .then((response) => {
        console.log('Media item removed:', response.data);
        setMediaItems(mediaItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error removing media item:', error.message);
      });
  };

  const filteredMediaItems =
    selectedState === 'all' ? mediaItems : mediaItems.filter((item) => item.status === selectedState);

  return (
    <div>
      <h2>Completed Media List</h2>
      <ul>
        {filteredMediaItems.map((mediaItem) => (
          <li key={mediaItem.id}>
            <h3>{mediaItem.title}</h3>
            <div className="status-container">
              <span className="status">Status: {mediaItem.status}</span>
              <div className="remove-btn">
                <button onClick={() => handleRemoveMedia(mediaItem.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;
