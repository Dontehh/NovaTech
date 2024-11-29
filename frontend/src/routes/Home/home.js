import React from "react";
import "./home.css";
import Header from '../../Components/Header/header';
import HeroSection from "../../Components/HeroSection/hr";
import SearchBar from "../../Components/SearchBar/searchbar";
import Login from "../Login/login";
import SportsSection from '../../Components/Spots/spots';
import PromotionalSection from "../../Components/PromotionalSec/PrSec";
import Footer from "../../Components/Footer/footer";

function Home() {
  return (
    <> 
      <div className="home-container">
        <Header />
        <HeroSection />
      </div>
      <SportsSection />
      <PromotionalSection />
      <Footer />
    </>
  );
}

export default Home;