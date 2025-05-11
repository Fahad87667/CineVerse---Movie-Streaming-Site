import React from "react";
import "./AboutUs.scss";

const developers = [
  {
    name: "Fahad Khan",
    role: "Full Stack Developer",
    img: "./src/assets/fahad.jpg",
    description:
      "Specialized in React and Node.js development. Passionate about creating seamless user experiences.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    name: "Arpit Sharma",
    role: "Backend Developer",
    img: "./src/assets/arpit.png",
    description:
      "Expert in database design and API development. Focused on building scalable backend solutions.",
    skills: ["Node.js", "MongoDB", "Express", "REST APIs"],
  },
  {
    name: "Atharva Joshi",
    role: "Frontend Developer",
    img: "./src/assets/atharva.jpg",
    description:
      "UI/UX enthusiast with a keen eye for design. Dedicated to creating beautiful and responsive interfaces.",
    skills: ["React", "SCSS", "JavaScript", "UI/UX"],
  },
];

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <h2 className="aboutus-title">About Us</h2>
      <p className="aboutus-desc">
        CineVerse is a modern movie streaming platform built with the MERN
        stack. Meet the talented developers behind this project:
      </p>
      <div className="aboutus-devs">
        {developers.map((dev, idx) => (
          <div className="aboutus-dev" key={idx}>
            <div className="aboutus-dev-header">
              <img src={dev.img} alt={dev.name} className="aboutus-photo" />
              <h3 className="aboutus-name">{dev.name}</h3>
              <p className="aboutus-role">{dev.role}</p>
            </div>
            <p className="aboutus-description">{dev.description}</p>
            <div className="aboutus-skills">
              {dev.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
