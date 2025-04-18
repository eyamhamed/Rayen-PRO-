import React from "react";
import "./Portfolio.css";
import Aos from "aos";
import { useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import realisation1 from "../../assets/realisation1.jpg";
import realisation2 from "../../assets/realisation2.jpg";
import realisation3 from "../../assets/realisation3.jpg";
import realisation4 from "../../assets/realisation4.jpg";
import realisation5 from "../../assets/realisation5.jpg";
import realisation6 from "../../assets/realisation6.jpg";
import realisation7 from "../../assets/realisation7.jpg";
import realisation8 from "../../assets/realisation8.jpg";
import realisation9 from "../../assets/realisation9.jpg";
import realisation10 from "../../assets/realisation10.jpg";
import realisation11 from "../../assets/realisation11.jpg";
import realisation12 from "../../assets/realisation12.jpg";
import realisation13 from "../../assets/realisation13.jpg";
import realisation14 from "../../assets/realisation14.jpg";
import realisation15 from "../../assets/realisation15.jpg";
import realisation16 from "../../assets/realisation16.jpg";
import realisation17 from "../../assets/realisation17.jpg";

const Portfolio = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const images = [
    [realisation1, realisation2, realisation3],
    [realisation4, realisation5, realisation6],
    [realisation7, realisation8, realisation9],
    [realisation10, realisation11, realisation12],
    [realisation13, realisation14, realisation16],
    [realisation15, realisation17]
  ];

  return (
    <>
      <div className="portfolio-container" id="portfolio">
        <h1
          data-aos="fade-down"
          className="titre-portfolio"
          
          alt="Portfolio Title">NOS RÉALISATIONS
          </h1>
        
        <div className="carousel10" data-aos="fade-up">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            showDots={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {images.map((group, index) => (
              <div key={index} className="portfolio-grid">
                {group.map((image, imgIndex) => (
                  <div key={imgIndex} className="portfolio-item">
                    <img src={image} alt={`Realisation ${index * 3 + imgIndex + 1}`} />
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
