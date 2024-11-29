import React from "react";
import "./PrSec.css";
import tournament from "./tournament.jpeg";
import sportsweekend from "./SportsWeekend.png";

const PromotionalSection = () => {
  const events = [
    { title: "football tournament", image: tournament }, 
    { title: "Outdoor Court", image: sportsweekend }, 
  ];

  return (
    <section className="events">
      <h2>Events</h2>
      <div className="events-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image} alt={event.title} />
            <div className="card-body">
              <a href="#" className="btn">
                Register
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionalSection;
