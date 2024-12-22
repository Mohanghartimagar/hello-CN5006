import React, { useState } from "react";
import axios from "axios";
import './adddata.css';

const AddTeam = () => {
  const [formData, setFormData] = useState({
    team: "",
    gamesPlayed: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    year: 0,
  });

  const [message, setMessage] = useState(""); // For success/error messages

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.team || !formData.year) {
      setMessage("Please fill in all required fields!");
      return;
    }

    try {
      // Ensure that field names match what your backend expects
      const dataToSend = {
        team: formData.team,  // Make sure frontend matches backend schema
        gamesPlayed: formData.gamesPlayed,
        win: formData.win,
        draw: formData.draw,
        loss: formData.loss,  // This should match backend `game_lost`
        goalsFor: formData.goalsFor,
        goalsAgainst: formData.goalsAgainst,
        points: formData.points,
        year: formData.year,
      };

      const response = await axios.post("http://localhost:5000/api/add", dataToSend);
      setMessage(response.data.message || "Data added successfully!");
      setFormData({
        team: "",
        gamesPlayed: 0,
        win: 0,
        draw: 0,
        loss: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
        year: 0,
      });
    } catch (error) {
      setMessage("Error adding data: " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  return (
    <div className="add-team-container">
      <h2>Add Team Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="team"
          placeholder="Team Name"
          value={formData.team}
          onChange={handleChange}
        />
        <input
          type="number"
          name="gamesPlayed"
          placeholder="Games Played"
          value={formData.gamesPlayed}
          onChange={handleChange}
        />
        <input
          type="number"
          name="win"
          placeholder="Wins"
          value={formData.win}
          onChange={handleChange}
        />
        <input
          type="number"
          name="draw"
          placeholder="Draws"
          value={formData.draw}
          onChange={handleChange}
        />
        <input
          type="number"
          name="loss"
          placeholder="Losses"
          value={formData.loss}
          onChange={handleChange}
        />
        <input
          type="number"
          name="goalsFor"
          placeholder="Goals For"
          value={formData.goalsFor}
          onChange={handleChange}
        />
        <input
          type="number"
          name="goalsAgainst"
          placeholder="Goals Against"
          value={formData.goalsAgainst}
          onChange={handleChange}
        />
        <input
          type="number"
          name="points"
          placeholder="Points"
          value={formData.points}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />
        <button type="submit">Add Team</button>
      </form>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddTeam;
