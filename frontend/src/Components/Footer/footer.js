import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="brand-info">
          <h3>Novafit</h3>
          <p>Streamline your athletic experience with our easy booking method!</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#career">Career</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#return">Return</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="newsletter">
          <h4>Get Updates</h4>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Novafit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
