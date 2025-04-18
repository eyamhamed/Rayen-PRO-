import React from 'react';
import "./NosValeurs.css";
import valeur1 from "../../assets/innovation.svg";
import valeur2 from "../../assets/fiabilite.svg";
import valeur3 from "../../assets/qualite.svg";
import valeur4 from "../../assets/ecoute.svg";
import valeur5 from "../../assets/transparence.svg";
import valeur6 from "../../assets/respect.svg";
import { Card, CardGroup } from 'react-bootstrap';
import Aos from "aos";
import { useEffect } from 'react';


const NosValeurs = () => {
   useEffect(() => {
      Aos.init({ duration: 500 });
    }, []);
  

  return (
    <>
      <div className="valeurs-container" id="valeurs">
      <h1
          data-aos="fade-down"
          className="titre-valeurs"
         
          alt="Nos Valeurs">NOS VALEURS
       </h1>
      <div/>
     
     
      <CardGroup  className='card-container1'>
      <Card  className="cards">
        <Card.Img data-aos="zoom-in" className="card-img" variant="top" src={valeur1} />
        <Card.Body>
          <Card.Title className="card-title1">Innovation</Card.Title>
          <Card.Text className="card-para">
          "Nous intégrons des techniques modernes pour des résultats durables."

          </Card.Text>
        </Card.Body>
        
      </Card>
      <Card className="cards">
        <Card.Img data-aos="zoom-in" className="card-img" variant="top" src={valeur2}  />
        <Card.Body>
          <Card.Title className="card-title1">Fiabilité</Card.Title>
          <Card.Text className="card-para">
          "Nous respectons nos engagements, nos délais et nos devis."

          </Card.Text>
        </Card.Body>
        
      </Card>
      <Card className="cards">
        <Card.Img data-aos="zoom-in" className="card-img" variant="top" src={valeur3} />
        <Card.Body>
          <Card.Title className="card-title1">Qualité</Card.Title>
          <Card.Text className="card-para">
          "Chaque chantier est réalisé avec exigence et savoir-faire."

          </Card.Text>
        </Card.Body>
        
      </Card>
      
    </CardGroup>
    <CardGroup className='card-container2'>
    <Card className="cards">
        <Card.Img data-aos="zoom-in" className="card-img" variant="top" src={valeur5}  />
        <Card.Body>
          <Card.Title className="card-title1">Transparence</Card.Title>
          <Card.Text className="card-para">
          "Aucun coût caché, une communication claire à chaque étape."

          </Card.Text>
        </Card.Body>
        
      </Card>
      <Card className="cards">
        <Card.Img data-aos="zoom-in" className="card-img" variant="top" src={valeur4}  />
        <Card.Body>
          <Card.Title className="card-title1">Écoute</Card.Title>
          <Card.Text className="card-para">
          "Vos besoins sont notre priorité, nous construisons avec vous."

          </Card.Text>
        </Card.Body>
        
      </Card>
     
      <Card className="cards">
        <Card.Img data-aos="zoom-in" className="card-img" variant="top" src={valeur6} />
        <Card.Body>
          <Card.Title className="card-title1">Respect</Card.Title>
          <Card.Text className="card-para">
          "Du client, de l’environnement et des normes en vigueur."
          </Card.Text>
        </Card.Body>
       
      </Card>
    </CardGroup>
    </div>
    </>
  );
};

export default NosValeurs;
