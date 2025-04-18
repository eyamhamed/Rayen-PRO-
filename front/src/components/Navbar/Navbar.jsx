import React, { useState } from "react";
import "./Navbar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../assets/logogco.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState("menu");
  const shownavbar = () => {
    setMenu("showNavbar menu");
  };

  const removenavbar = () => {
    setMenu(" removeNavbar menu");
  };

  const [transparent, setTransparent] = useState("Navbar");
  const addBG = () => {
    if (window.scrollY >= 10) {
      setTransparent("Navbar addBackground");
    } else {
      setTransparent("Navbar");
    }
  };
  window.addEventListener("scroll", addBG);

  const navigateAndScroll = (elementId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToHeader = () => navigateAndScroll("header");
  const scrollToAboutUs = () => navigateAndScroll("aboutUs");
  const scrollToService = () => navigateAndScroll("services");
  const scrollToValue = () => navigateAndScroll("valeurs");
  const scrollToPortfolio = () => navigateAndScroll("portfolio");
  const scrollToClient = () => navigateAndScroll("clients");
  const scrollToFooter = () => navigateAndScroll("footer");

  return (
    <div className={transparent}>
      <div className="logoDiv">
        <img src={image} className="logonav" alt="Logo" onClick={scrollToHeader} />
      </div>

      <div className={menu}>
        <ul id="lista">
          <li className="navList" onClick={scrollToAboutUs}>À PROPOS</li>
          <li className="navList" onClick={scrollToService}>NOS SERVICES</li>
          <li className="navList" onClick={scrollToValue}>NOS VALEURS</li>
          <li className="navList" onClick={scrollToPortfolio}>NOS RÉALISATIONS</li>
          <li className="navList" onClick={scrollToClient}>AVIS CLIENTS</li>
        </ul>
        <AiFillCloseCircle className="icon closeIcon" onClick={removenavbar} />
      </div>

      <button className="contactBtn" onClick={scrollToFooter}>CONTACT</button>

      <PiDotsNineBold className="icon menuIcon" onClick={shownavbar} />
    </div>
  );
};

export default Navbar;
