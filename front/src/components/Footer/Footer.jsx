import React, { useEffect } from "react";

import "./Footer.css";

import { ImFacebook } from "react-icons/im";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import Aos from "aos";
import logofooter from "../../assets/logogco.svg";



const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/330675808486', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/rayaneprofrejus/', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/people/Rayane-PRO/61571016145099/', '_blank');
  };

  // const handleLinkedInClick = () => {
  //   window.open('https://www.linkedin.com/company/ganeshcodingoffice/', '_blank');
  // };

  return (
    <div className="Footer" id="footer">
      <div className="secContainer">
        <div data-aos="fade-up" className="footerLogo">
          <img src={logofooter} alt="Logo ODE" className="logonav" />
        </div>
        <div className="slogan">
        <h1 >DES TRAVAUX DURABLES, UN RENDU IMPECCABLE!</h1>

        </div>
        

        <div className="contactDetails">
          <span className="email">Rayanepro.83600@gmail.com</span>
          <span className="phone"> +33 0675808486   </span>
          
        </div>
        <div className="socials flex">
          <AiFillInstagram className="icon" onClick={handleInstagramClick} />
          <ImFacebook className="icon" onClick={handleFacebookClick} />
          {/* <AiFillLinkedin className="icon" onClick={handleLinkedInClick} /> */}
          <RiWhatsappFill className="icon" onClick={handleWhatsAppClick} />
        </div>
        <div className="copyright">
        <p>PROPULSÉ PAR</p> <a href="https://www.ganeshcoding.com/" target="_blank" rel="noopener noreferrer">GANESH CODING OFFICE</a>
       <div>
          <span>©2023-TOUS DROITS RÉSERVÉS</span> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
