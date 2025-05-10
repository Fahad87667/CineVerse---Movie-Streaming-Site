import React from "react";
import {
  FaGithub,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.scss";

const Footer = () => (
  <footer className="cineverse-footer">
    <div className="footer-content">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>CineVerse</h2>
          <p>Your Ultimate Movie Universe</p>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <div className="contact-links">
            <a href="mailto:contact@cineverse.com" className="footer-link">
              <FaEnvelope /> contact@cineverse.com
            </a>
            <a
              href="https://github.com/your-repo-url"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="social-links">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} CineVerse. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
