import React, { useState, useEffect  } from 'react';
import ListInsert from './components/ListInsert';
import MediaList from './components/MediaList';
import ListSelect from './components/ListSelect';
import './styles/styles.css';

const App = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedState, setSelectedState] = useState('all');

  // update mediaItems after successful submission function
  const handleMediaItemAdded = (newMediaItem) => {
    setMediaItems([...mediaItems, newMediaItem]);

    //stores items to local storage
    localStorage.setItem('mediaItems', JSON.stringify([...mediaItems, newMediaItem]));
  };
  // state change function
  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  useEffect(() => {
    const storedMediaItems = JSON.parse(localStorage.getItem('mediaItems'));
    if (storedMediaItems) {
      setMediaItems(storedMediaItems);
    }
  }, []);

  return (
    <div>
      <h1>Media Tracker</h1>
      <ListInsert onMediaItemAdded={handleMediaItemAdded} />
      <ListSelect onStateChange={handleStateChange} />
      <MediaList mediaItems={mediaItems} setMediaItems={setMediaItems} selectedState={selectedState} />
    </div>
  );
};

export default App;
