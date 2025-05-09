import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => (
  <footer className="cineverse-footer">
    <div className="footer-content">
      <div className="footer-links">
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/movies" className="footer-link">
          Movies
        </Link>
        <Link to="/tv-shows" className="footer-link">
          TV Shows
        </Link>
        <Link to="/new-popular" className="footer-link">
          New & Popular
        </Link>
        <Link to="/my-list" className="footer-link">
          My List
        </Link>
        <Link to="/about" className="footer-link">
          About Us
        </Link>
        <a href="mailto:contact@cineverse.com" className="footer-link">
          Contact
        </a>
        <a
          href="https://github.com/your-repo-url"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} CineVerse</div>
    </div>
  </footer>
);

export default Footer;
