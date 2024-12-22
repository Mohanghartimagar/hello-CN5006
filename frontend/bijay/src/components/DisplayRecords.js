import React, { useState } from 'react';
import axios from 'axios';

const TeamStats = () => {
  const [teamName, setTeamName] = useState('');
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState('');

  // Function to fetch stats for a given team
  const fetchTeamStats = async () => {
    const trimmedTeamName = teamName.trim();  // Trim any leading/trailing spaces
    if (!trimmedTeamName) {
      setMessage('Please enter a team name!');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5000/api/team-stats/${trimmedTeamName}`);
      setStats(response.data);
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching team stats!');
      setStats(null);
    }
  };
  

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Team Statistics</h2>
      <input
        type="text"
        placeholder="Enter Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={fetchTeamStats} style={{ padding: '10px', width: '100%' }}>
        Fetch Stats
      </button>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {stats && (
        <div style={{ marginTop: '20px' }}>
          <h3>Stats for {teamName}:</h3>
          <p><strong>Total Games Played:</strong> {stats.games_played}</p>
          <p><strong>Total Draws:</strong> {stats.games_drawn}</p>
          <p><strong>Total Wins:</strong> {stats.games_won}</p>
        </div>
      )}
    </div>
  );
};

export default TeamStats;
