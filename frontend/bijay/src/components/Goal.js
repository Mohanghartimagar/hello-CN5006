import React, { useState } from 'react';
import axios from 'axios';

const DisplayTeamsByYear = () => {
  const [year, setYear] = useState('');
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');

  // Function to fetch teams for the given year
  const fetchTeamsByYear = async () => {
    if (!year || isNaN(year)) {
      setMessage('Please enter a valid year');
      return;
    }

    try {
      // Send the GET request with the year
      const response = await axios.get(`http://localhost:5000/api/teams/average-goals-for?year=${year}`);
      setTeams(response.data);
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching teams');
      setTeams([]);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2>Teams with Goals Scored Above Average for a Given Year</h2>
      
      <input
        type="number"
        placeholder="Enter Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={fetchTeamsByYear} style={{ padding: '10px', width: '100%' }}>
        Fetch Teams
      </button>
      
      {message && <p style={{ color: 'red' }}>{message}</p>}
      
      {teams.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Teams with Goals Scored Above Average for {year}:</h3>
          <table border="1" cellPadding="10" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Games Played</th>
                <th>Games Won</th>
                <th>Games Drawn</th>
                <th>Games Lost</th>
                <th>Goals Scored</th>
                <th>Goals Conceded</th>
                <th>Points</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.team_name}</td>
                  <td>{team.games_played}</td>
                  <td>{team.games_won}</td>
                  <td>{team.games_drawn}</td>
                  <td>{team.game_lost}</td>
                  <td>{team.goals_scored}</td>
                  <td>{team.goals_conceded}</td>
                  <td>{team.points}</td>
                  <td>{team.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayTeamsByYear;
