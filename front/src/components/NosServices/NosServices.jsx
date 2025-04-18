import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./NosServices.css";
import consultingcenter from "../../assets/terrassement.jpg";



import designcenter from "../../assets/facade.jpg";


import devcenter from "../../assets/peintureext.jpg";

import Aos from "aos";

const NosServices = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const [services] = useState([
    {
      description: "Terrassement",
      centerImg: consultingcenter,
     
    },
    {
      description: "Façades",
      centerImg: designcenter,
     
    },
    {
      description: "Peinture extérieure",
      centerImg: devcenter,
     
    },
  ]);

  return (
    <div className="services-container" id="services">
      <h1
        data-aos="fade-down"
        className="titre-services"
        
        alt="Our Services" >NOS SERVICES
        </h1>

      <div className="services-grid">
        {services.slice(0, 3).map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            onClick={() => (window.location.href = `/service/${index}`)}
          >
            <p className="service-description">{service.description}</p>
           
            <img
              className="service-image"
              src={service.centerImg}
              alt="Service"
            />
            

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NosServices;
