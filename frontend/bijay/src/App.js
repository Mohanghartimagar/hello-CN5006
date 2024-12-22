// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddData from './components/AddData';
import UpdateData from './components/UpdateData';
import ShowStats from './components/ShowStats';
import DeleteData from './components/DeleteData';
import DisplayRecords from './components/DisplayRecords';
import Goal from './components/Goal';
import './App.css';
 
function App() {
  return (
    <Router>
      <div>
        <h1>Football Data</h1>
        {/* You can add a navigation menu here */}
        <nav>
          <ul>
            <li><a href="/add">Add Data</a></li>
            <li><a href="/update">Update Data</a></li>
            <li><a href="/stats">Show Stats</a></li>
            <li><a href="/delete">Delete Data</a></li>
            <li><a href="/go">goal average</a></li>
            <li><a href="/records">Display Records</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add" element={<AddData />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/stats" element={<ShowStats />} />
          <Route path="/delete" element={<DeleteData />} />
          <Route path="/records" element={<DisplayRecords />} />
          <Route path="/go" element={<Goal/>} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;