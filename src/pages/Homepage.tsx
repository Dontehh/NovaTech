import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Homepage.css'; // Import CSS for styling

const slogans = [
  "Your fitness journey starts here!",
  "Empower your body and mind.",
  "Join our community today!",
  "Transform your life with us!",
];

const Homepage: React.FC = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [showSlogan, setShowSlogan] = useState(false); // State to control slogan visibility

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSlogan(false); // Hide the slogan
      setTimeout(() => {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
        setShowSlogan(true); // Show the new slogan
      }, 500); // Wait for the fade-out before changing the slogan
    }, 3000); // Change slogan every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">NovaFit:</h1>
        <h2 className={`slogan ${showSlogan ? 'show' : ''}`}>{slogans[currentSlogan]}</h2>
      </div>

      {/* New Section */}
      <div className="info-section">
        <div className="info-item">
          <div className="info-image">
            <img src="./src/pics/pool.jpeg" alt="Facilities" />
          </div>
          <div className="info-description">
            <h3>• Facilities</h3>
            <p>Explore our state-of-the-art facilities designed to enhance your fitness journey. You can easily book one of our facilities, including:</p>
            <ul>
              <li>⠀• Soccer Field A</li>
              <li>⠀• Soccer Field B</li>
              <li>⠀• Proxy Field</li>
              <li>⠀• Futsal Court</li>
              <li>⠀• Basketball Court</li>
              <li>⠀• Swimming Pool</li>
              <li>⠀• Padel Court</li>
            </ul>
            <Link to="/facilities">
              <button className="action-button">Book now</button> {/* Button for Facilities */}
            </Link>
          </div>
        </div>
        <div className="info-item">
          <div className="info-description">
            <h4>• Events⠀</h4>
            <p>Join our exciting events and activities to stay motivated and engaged.</p>
            <Link to="/events">
              <button className="action-button">Explore more</button> {/* Button for Events */}
            </Link>
          </div>
          <div className="info-image">
            <img src="./src/pics/events.png" alt="Events" />
          </div>
        </div>
        <div className="info-item">
          <div className="info-image">
            <img src="./src/pics/team.jpeg" alt="Teams" />
          </div>
          <div className="info-description">
            <h3>• Teams</h3>
            <p>Create or join a team to improve your journey.</p>
            <Link to="/teams">
              <button className="action-button">Find team</button> {/* Button for Teams */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
