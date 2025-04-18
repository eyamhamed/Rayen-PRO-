import React, { useEffect, useState } from "react";
import "./Apropos.css";
import titregco from "../../assets/titregco.jpg";

import Aos from "aos";
import { Row, Container, Col, Card, Button } from "react-bootstrap"


const Apropos = () => {
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  

  
  return (
    <>
      <div className="aboutus-container">
        <div data-aos="fade-down"  className="aboutUs" id="aboutUs">
          
            <h3  className="titre-about"  alt="About Us">À PROPOS </h3>
          
        </div>


<Container data-aos="fade-right" className="sous-titre2">
  <Row className="g-4">
    <Col md={6}>
      <Card className="card" >
        <Card.Body>
          <img className="titreGco img-fluid" src={titregco} alt="GCO Title" />
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card className="card" >
        <Card.Body>
          <Card.Title className="title-rayane" >UNE VISION, UNE PASSION, UN SAVOIR-FAIRE AU SERVICE DE VOS PROJETS.</Card.Title>
          <Card.Text className="hided-para1">
            <b>RAYANE PRO</b>, c'est l'histoire d'une entreprise née de la passion pour le bâtiment, portée par une volonté farouche d'offrir un travail de qualité irréprochable. Installée à Fréjus, au cœur du Var, notre équipe intervient avec sérieux, exigence et professionnalisme sur tous types de projets extérieurs.
            {showFullText ? (
              <>
                <br /><br />
                Depuis nos débuts, nous avons fait de la préparation de terrain, de la rénovation de façades et de la peinture extérieure nos spécialités. Chaque chantier est pour nous une opportunité de démontrer notre savoir-faire, de relever de nouveaux défis et surtout, de gagner la confiance de nos clients.
                <br /><br />
                Notre force ? Un accompagnement sur mesure, du premier contact jusqu'à la livraison finale. Que vous soyez un particulier, une entreprise ou une collectivité, nous vous garantissons des prestations soignées, des délais respectés et des résultats à la hauteur de vos attentes.
                <br /><br />
                Chez RAYANE PRO, nous croyons que chaque projet mérite notre pleine attention. Car au-delà des outils et des matériaux, c'est la passion du métier et le respect de nos engagements qui font toute la différence.
              </>
            ) : null}
          </Card.Text>
          <Button 
            onClick={() => setShowFullText(!showFullText)} 
            className="read-more-btn"
            variant="outline-secondary"
          >
            {showFullText ? 'Lire moins' : 'Lire plus'}
          </Button>
          
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

        
          
       
      </div>
    </>
  );
};

export default Apropos;
