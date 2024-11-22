import React from "react";
import "./home.css";
import Header from '../Header/header';
import SearchBar from "../SearchBar/searchbar";
import SportsSection from '../SportsSection/sportssection';

function Home() {
  return (
    <>
      
      <div className="home-container">
        <Header />
        <div className="title">
          Book your athletic facility <br /> effortlessly with
        </div>
        <SearchBar />
      </div>
      <SportsSection />
    </>
  );
}

export default Home;