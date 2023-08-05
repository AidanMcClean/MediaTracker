import React, { useState } from 'react';

const ListSelect = ({ onStateChange }) => {
  const [selectedState, setSelectedState] = useState('all');

  const handleStateChange = (state) => {
    setSelectedState(state);
    onStateChange(state);
  };

  return (
    <div>
      <button
        onClick={() => handleStateChange('all')}
        style={{ backgroundColor: selectedState === 'all' ? 'gray' : 'white' }}
      >
        All
      </button>
      <button
        onClick={() => handleStateChange('Planning')}
        style={{ backgroundColor: selectedState === 'Planning' ? 'gray' : 'white' }}
      >
        Planning
      </button>
      <button
        onClick={() => handleStateChange('In Progress')}
        style={{ backgroundColor: selectedState === 'In Progress' ? 'gray' : 'white' }}
      >
        In Progress
      </button>
      <button
        onClick={() => handleStateChange('Completed')}
        style={{ backgroundColor: selectedState === 'Completed' ? 'gray' : 'white' }}
      >
        Completed
      </button>
    </div>
  );
};

export default ListSelect;
