var express = require("express");
const path = require('path');
const cors = require("cors");
let mongoconnection = require("./connection/connection")
const Team = require('./models/footballData')
var app = express()
var bodypraser = require("body-parser")

app.use(bodypraser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post('/api/add', async (req, res) => {
    const { team, gamesPlayed, win, draw, loss, goalsFor, goalsAgainst, points, year } = req.body;
  
    // Basic Validation
    if (!team || !gamesPlayed || !win || !draw || !loss || !goalsFor || !goalsAgainst || !points || !year) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Create new Team document
      const newTeam = new Team({
        team_name: team,
        games_played: gamesPlayed,
        games_won: win,  // Make sure this is using the correct property
        games_drawn: draw,
        game_lost: loss,  // Ensure this matches the schema field name
        goals_scored: goalsFor,
        goals_conceded: goalsAgainst,
        points: points,
        year: year,
      });
  
      // Save to database
      await newTeam.save();
      res.status(201).json({ message: 'Data added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding data: ' + error.message });
    }
  });
app.get('/api/team-stats/:teamName', async (req, res) => {
    const { teamName } = req.params;
    console.log('Team Name:', teamName);  // Log the team name

    try {
        const team = await Team.findOne({ team_name: teamName });
        console.log('Team:', team);  // Log the team data
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const { games_played, games_drawn, games_won } = team;
        res.status(200).json({ games_played, games_drawn, games_won });
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: 'Error fetching team stats: ' + error.message });
    }
});
app.post('/api/update', async (req, res) => {
    const { team_name, games_played, games_won, games_drawn, games_lost, goals_scored, goals_conceded, points, year } = req.body;
    try {
        const updatedTeam = await Football.findOneAndUpdate(
            { team_name },
            { games_played, games_won, games_drawn, games_lost, goals_scored, goals_conceded, points, year },
            { new: true }
        );
        res.status(200).json({ message: 'Team updated successfully', updatedTeam });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/stats', async (req, res) => {
    const { year } = req.query;
    try {
        const teams = await Football.find({ year });
        const totalGames = teams.reduce((sum, team) => sum + team.games_played, 0);
        const totalWins = teams.reduce((sum, team) => sum + team.games_won, 0);
        const totalDraws = teams.reduce((sum, team) => sum + team.games_drawn, 0);

        res.status(200).json({ year, totalGames, totalWins, totalDraws });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/team/:teamName', async (req, res) => {
    const { teamName } = req.params;
    console.log('Deleting Team:', teamName);  

    try {
        const team = await Team.findOneAndDelete({ team_name: teamName });

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({ message: `${teamName} deleted successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting team: ' + error.message });
    }
});
app.get('/api/teams/games-won', async (req, res) => {
    const { gamesWonThreshold } = req.query;

    // Ensure the gamesWonThreshold is a number
    if (!gamesWonThreshold || isNaN(gamesWonThreshold)) {
        return res.status(400).json({ message: 'Please provide a valid number for games won threshold' });
    }

    try {
        // Query for teams where games_won is greater than the provided threshold
        const teams = await Team.find({ games_won: { $gt: Number(gamesWonThreshold) } })
            .limit(10)  // Get the first 10 records
            .sort({ games_won: -1 });  // Sort by games_won in descending order

        if (teams.length === 0) {
            return res.status(404).json({ message: 'No teams found with games won greater than ' + gamesWonThreshold });
        }

        // Return the teams data
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching teams: ' + error.message });
    }
});
app.get('/api/teams/average-goals-for', async (req, res) => {
    const { year } = req.query;

    if (!year || isNaN(year)) {
        return res.status(400).json({ message: 'Please provide a valid year' });
    }

    try {
        // Query MongoDB to find teams for the given year
        const teams = await Team.find({ year: parseInt(year) });

        if (teams.length === 0) {
            return res.status(404).json({ message: 'No teams found for the given year.' });
        }

        res.json(teams);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});