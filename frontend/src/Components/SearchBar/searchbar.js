import React, { useState } from "react";
import './searchbar.css';

function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkInOut, setCheckInOut] = useState("");
  const [players, setPlayers] = useState("");

  // Handle search button click
  const handleSearch = () => {
    console.log("Searching for:", { location, checkInOut, players });
    // You can replace the console log with actual search logic
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        {/* Input for location */}
        <input 
          type="text" 
          placeholder="Where?" 
          value={location}
          onChange={(e) => setLocation(e.target.value)} 
        />

        {/* Select for check-in and check-out */}
        <select
          value={checkInOut}
          onChange={(e) => setCheckInOut(e.target.value)}
        >
          <option value="">Check-in - Check-out</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="upcoming">Upcoming</option>
        </select>

        {/* Select for players */}
        <select
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        >
          <option value="">Players</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </select>
      </div>
      
      {/* Search Button */}
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
