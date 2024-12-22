import React, { useState } from 'react';
import axios from 'axios';
import './update.css';

const UpdateData = () => {
  const [team, setTeam] = useState('');
  const [formData, setFormData] = useState({
    games_played: 0,
    games_won: 0,
    games_drawn: 0,
    games_lost: 0,
    goals_scored: 0,
    goals_conceded: 0,
    points: 0,
    year: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        team_name: team, // Include the team name in the request body
      };

      await axios.post('/api/update', updatedData); // Send data to the API endpoint
      alert('Data updated successfully!');
    } catch (error) {
      alert('Error updating data!');
    }
  };

  return (
    <div className="update-container">
      <form onSubmit={handleSubmit}>
        <h2>Update Team Data</h2>
        <input
          placeholder="Team Name"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />
        <input name="games_played" placeholder="Games Played" type="number" onChange={handleChange} />
        <input name="games_won" placeholder="Win" type="number" onChange={handleChange} />
        <input name="games_drawn" placeholder="Draw" type="number" onChange={handleChange} />
        <input name="games_lost" placeholder="Loss" type="number" onChange={handleChange} />
        <input name="goals_scored" placeholder="Goals For" type="number" onChange={handleChange} />
        <input name="goals_conceded" placeholder="Goals Against" type="number" onChange={handleChange} />
        <input name="points" placeholder="Points" type="number" onChange={handleChange} />
        <input name="year" placeholder="Year" type="number" onChange={handleChange} />
        <button type="submit">Update Data</button>
      </form>
    </div>
  );
};

export default UpdateData;