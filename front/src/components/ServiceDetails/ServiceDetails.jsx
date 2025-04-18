import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css';
import terrassement from '../../assets/terrassement.jpg';
import facade from '../../assets/facade.jpg';
import peintureext from '../../assets/peintureext.jpg';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Service details mapping with images
  const serviceDetails = [
    {
      title: 'Terrassement',
      image: terrassement,
      description: 'Chez RAYANE PRO, le terrassement est bien plus qu’une simple étape préparatoire : c’est le fondement de tout projet réussi. Nous mettons notre expertise au service de vos terrains pour garantir une base solide, stable et conforme aux exigences techniques de vos futures constructions ou aménagements.',
      features: [
        'Étude du sol et délimitation de la zone à terrasser',
        'Déblaiement des terres, roches ou gravats',
        'Nivellement précis du terrain',
        'Excavation pour fondations ou tranchées techniques',
        'Remblaiement avec matériaux adaptés',
        'Compactage mécanique pour assurer une base solide',
        
      ]
    },
    {
      title: 'Façades',
      image: facade,
      description: 'Avec RAYANE PRO, redonnez vie à vos façades. Nous intervenons pour préserver, rénover et valoriser l’enveloppe extérieure de votre bâtiment. Notre approche allie technicité, esthétisme et durabilité pour faire de vos murs une vraie signature visuelle, tout en assurant leur protection.',
      features: [
        'Diagnostic des fissures, infiltrations ou décollements',

'Nettoyage haute pression ou sablage pour retirer mousses, salissures et anciennes couches',

'Traitement des fissures, enduits ou rebouchages',

'Application de traitements anti-humidité et anti-mousse',

'Pose d’un enduit décoratif ou ravalement complet',

'Finition esthétique avec coloris adaptés et durables',

      ]
    },
    {
      title: 'Peinture extérieure',
      image: peintureext,
      description: 'La peinture extérieure, chez RAYANE PRO, c’est l’union parfaite entre style et protection. Nous sélectionnons des produits de haute qualité et appliquons des techniques éprouvées pour sublimer vos surfaces, tout en les protégeant durablement contre les agressions climatiques.',
      features: [
        'Grattage des anciennes peintures écaillées',

'Application d’un primaire d’accroche adapté au support',

'Choix de peinture professionnelle résistante aux intempéries',

'Application de deux couches minimum pour un rendu net',

'Finitions précises sur corniches, volets, garde-corps, etc.',
      ]
    }
  ];

  const service = serviceDetails[parseInt(id)];

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleServiceClick = (index) => {
    navigate(`/service/${index}`);
  };

  return (
    <div className="service-details-container">
      <div className="service-navigation">
        {serviceDetails.map((s, index) => (
          <div
            key={index}
            className={`service-nav-item ${parseInt(id) === index ? 'active' : ''}`}
            onClick={() => handleServiceClick(index)}
          >
            {s.title}
          </div>
        ))}
      </div>
      
      <div className="service-content">
        <div className="service-image-container">
          <img 
            src={service.image} 
            alt={service.title} 
            className="service-details-image" 
          />
        </div>
        
        <div className="service-info">
          
          <p className="service-details-description">{service.description}</p>
          <div className="service-features">
            <h2>Ce que nous faisons concrètement :</h2>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
