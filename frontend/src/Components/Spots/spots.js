import React from "react";
import indoor from "./indoor.jpeg";
import outdoor from "./outdoor.jpeg";
import "./spots.css";

const Spots = () => {
  const spots = [
    { title: "Indoor court", image: indoor }, // Correct usage
    { title: "Outdoor Court", image: outdoor }, // Correct usage
  ];

  return (
    <section className="spots">
      <h2>Spots</h2>
      <h10>Find your teammates and book</h10>
      <nav class="navbar">
        <div class="navbar-nav">
          <button class="btn nav-btn">Basketball</button>
          <button class="btn nav-btn">Futsal</button>
          <button class="btn nav-btn">Fitness</button>
          <button class="btn nav-btn">Tennis</button>
          <button class="btn nav-btn">Swimming</button>
          <button class="btn nav-btn">See All<i class="bi bi-chevron-right"></i></button>
        </div>
      </nav>
      <div className="spots-container">
        {spots.map((spot, index) => (
          <div key={index} className="spot-card">
            <img src={spot.image} alt={spot.title} />
            <div className="card-body">
              <h5 className="card-title">{spot.title}</h5>
              <p className="card-text">
                {spot.description || "Quick example text to describe this spot."}
              </p>
              <a href="#" className="btn">
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spots;
