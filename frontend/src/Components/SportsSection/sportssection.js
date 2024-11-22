import React from "react";
import indoor from "./indoor.jpeg"
import outdoor from "./outdoor.jpeg"
import "./sportssection.css";

function SportsSection() {
  return (
    <>
    <h3> Spots </h3>
    <div className="spots-section">
      {/* Indoor Court Section */}
      <div className="court-section indoor-court">
        <div className="court-title">Indoor Court</div>
        <img
          src={indoor} // Replace with your actual image URL
          alt="Indoor Court"
          className="court-image"
        />
        <button className="see-all-button">See All</button>
      </div>

      {/* Outdoor Court Section */}
      <div className="court-section outdoor-court">
        <div className="court-title">Outdoor Court</div>
        <img
          src={outdoor}
          alt="outdoor"
          className="court-image"
        />
        <button className="see-all-button">See All</button>
      </div>
    </div>
    </>
  );
}

export default SportsSection;
