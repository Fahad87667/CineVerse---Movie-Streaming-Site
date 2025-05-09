import React from "react";
import "./AboutUs.scss";

const developers = [
  {
    name: "Fahad Khan",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Arpit Sharma",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Atharva Joshi",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <h2 className="aboutus-title">About Us</h2>
      <p className="aboutus-desc">
        CineVerse is a modern movie streaming platform built with the MERN
        stack. Meet the developers behind this project:
      </p>
      <div className="aboutus-devs">
        {developers.map((dev, idx) => (
          <div className="aboutus-dev" key={idx}>
            <img src={dev.img} alt={dev.name} className="aboutus-photo" />
            <div className="aboutus-name">{dev.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
