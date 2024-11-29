import React from "react";
import "./hr.css";
import SearchBar from "../SearchBar/searchbar";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>Book your athletic facility effortlessly with Novafit</h1>
      <p>Reserve your spot, join teams, and stay active with our seamless athletic booking system.</p>
      <SearchBar />
    </section>
  );
};

export default HeroSection;
