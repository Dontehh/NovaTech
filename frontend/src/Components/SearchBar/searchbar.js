import React, { useState } from "react";
import './searchbar.css';

function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkInOut, setCheckInOut] = useState("");
  const [players, setPlayers] = useState("");

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevents form submission reload
    console.log("Searching for:", { location, checkInOut, players });
    // replace the console log with actual search logic
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        {/* Input for location */}
        <div className="col">
          <select className="custome-select my-1 mr-sm-2" defaultValue="Fields">
                  <option value="Fields" disabled>Fields</option>
                  <option value="1">Old Soccer Field</option>
                  <option value="2">New Soccer Field</option>
                  <option value="3">Gymnasium </option>
                  <option value="4">Tennis Field</option>
                  <option value="5">Paddle Field</option>
            </select>          
          </div>

        {/* Input for check-in and check-out */}
        <input
          type="date"
          value={checkInOut}
          onChange={(e) => setCheckInOut(e.target.value)}
        />

        {/* Input for number of players */}
        <input
          type="number"
          placeholder="Number of players"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
