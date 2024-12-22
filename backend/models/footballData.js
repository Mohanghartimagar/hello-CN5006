//mongoose Schema  for the dataset and from this Schema create a model to be used in add, delete, update and find
//queries
const mongoose = require('mongoose');

// Define the schema for the football data
const footballDataSchema = new mongoose.Schema({
  team_name: { type: String, required: true },
  games_played: { type: Number, required: true },
  games_won: { type: Number, required: true },
  games_drawn: { type: Number, required: true },
  game_lost: { type: Number, required: true },
  goals_scored: { type: Number, required: true },
  goals_conceded: { type: Number, required: true },
  points: { type: Number, required: true },
  year: { type: Number, required: true }
});

// Create the model for the schema
const FootballData = mongoose.model('FootballData', footballDataSchema);

// Export the model
module.exports = FootballData;