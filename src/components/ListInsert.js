import React, { useState } from 'react';
import axios from 'axios';

const ListInsert = ({ onMediaItemAdded }) => {
    const [mediaName, setMediaName] = useState('');
    const [mediaStatus, setMediaStatus] = useState(''); 

    const handleFormSubmit = (e) => {
        e.preventDefault();

        //Media Item Object
        const newMediaItem = {
            title: mediaName,
            status: mediaStatus || 'NA',
        };        

        axios.post('http://localhost:5000/api/media', newMediaItem)
            .then((response) => {
                onMediaItemAdded(response.data);
                console.log('Media item added:', response.data);
            })
            .catch((error) => {
                console.error('Error adding media item:', error.message);
            });

      setMediaName('');
      setMediaStatus('');
    };


    
    return (
        <form onSubmit={handleFormSubmit}>
            <input
            type="text"
            value={mediaName}
            onChange={(e) => setMediaName(e.target.value)}
            placeholder="Enter media name"
            />
            <select
            value={mediaStatus}
            onChange={(e) => setMediaStatus(e.target.value)}
            >
            <option value="">Select status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            </select>
            <button type="submit">Add to List</button>
        </form>
    );
};  

export default ListInsert;
