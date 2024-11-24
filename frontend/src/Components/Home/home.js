import React from "react";
import "./home.css";
import Header from '../Header/header';
import HeroSection from "../HeroSection/hr";
import SearchBar from "../SearchBar/searchbar";
import Login from "../Login/login";
import SportsSection from '../Spots/spots';
import PromotionalSection from "../PromotionalSec/PrSec";
import Footer from "../Footer/footer";

function Home() {
  return (
    <>
      
      <div className="home-container">
        {/*<Login />*/}
        <Header />
        {/* <div className="title">
          Book your athletic facility <br /> effortlessly with
        </div>
        <SearchBar /> */}
        <HeroSection />
      </div>
      <SportsSection />
      <PromotionalSection />
      <Footer />
    </>
  );
}

export default Home;