import React, { useState } from 'react';
import axios from 'axios';

const DeleteTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);

  // Function to delete the team
  const deleteTeam = async () => {
    const trimmedTeamName = teamName.trim(); // Remove any extra spaces

    if (!trimmedTeamName) {
      setMessage('Please enter a team name!');
      return;
    }

    try {
      // Send the DELETE request to the backend
      const response = await axios.delete(`http://localhost:5000/api/team/${trimmedTeamName}`);
      setMessage(response.data.message);
      setDeleted(true); // Mark the team as deleted
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error deleting team!');
      setDeleted(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Delete Team Record</h2>
      <input
        type="text"
        placeholder="Enter Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={deleteTeam} style={{ padding: '10px', width: '100%' }}>
        Delete Team
      </button>
      {message && <p style={{ color: deleted ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default DeleteTeam;
