import React from "react";
import "./hr.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>Book your athletic facility effortlessly with Novafit</h1>
      <p>Reserve your spot, join teams, and stay active with our seamless athletic booking system.</p>
      <div className="search-bar">
        <input type="text" placeholder="Where?" />
        <input type="date" placeholder="Check-in — Check-out" />
        <input type="number" placeholder="Players" />
        <button>Search</button>
      </div>
    </section>
  );
};

export default HeroSection;
