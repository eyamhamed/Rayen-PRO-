
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Header.css';

// Import your carousel images here
import image1 from '../../assets/carousel1.svg';
import image2 from '../../assets/carousel2.svg';
import image3 from '../../assets/carousel5.svg';
import image4 from '../../assets/carousel4.svg';

const Header = () => {
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

  return (
    <div className='header-Component' id="header">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        <div>
          <img src={image1} alt="Slide 1" className="carousel-image" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" className="carousel-image" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" className="carousel-image" />
        </div>
        <div>
          <img src={image4} alt="Slide 4" className="carousel-image" />
        </div>
      </Carousel>
    </div>
  );
};

export default Header;
