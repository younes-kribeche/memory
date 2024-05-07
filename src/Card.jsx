import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

function Card({ cardStates, setCardStates, gameStarted }) {
  const images = [
    "/public/Aelithia.jpg",
    "/public/Aeral.jpg",
    "/public/Azuraelle.jpg",
    "/public/Gollemen_de_pierre.jpg",
    "/public/Ignir.jpg",
    "/public/Kraglo.jpg",
    "/public/Le_Blex.jpg",
    "/public/Serpent_de_mer.jpg",
    "/public/Tempestel.jpg",
    "/public/Wyvern.jpg",
    "/public/Lumicervid.jpg",
    "/public/Crepuscaire.jpg",
    "/public/Aelithia.jpg",
    "/public/Aeral.jpg",
    "/public/Azuraelle.jpg",
    "/public/Gollemen_de_pierre.jpg",
    "/public/Ignir.jpg",
    "/public/Kraglo.jpg",
    "/public/Le_Blex.jpg",
    "/public/Serpent_de_mer.jpg",
    "/public/Tempestel.jpg",
    "/public/Wyvern.jpg",
    "/public/Lumicervid.jpg",
    "/public/Crepuscaire.jpg"
  ];

  useEffect(() => {
    // Reset card states when component unmounts
    return () => {
      setCardStates(Array(24).fill({ isFlipped: false }));
    };
  }, [setCardStates]);

  const [flipped, setFlipped] = useState(Array(24).fill(false));
  const [lastClickedCards, setLastClickedCards] = useState([]);

  // Met à jour l'état flipped lorsqu'il y a un changement dans isFlipped
  useEffect(() => {
    setFlipped(cardStates.map(card => card.isFlipped));
  }, [cardStates]);

  useEffect(() => {
    // Vérifie si les deux dernières cartes cliquées ont le même nom
    if (lastClickedCards.length === 2) {
      const [firstIndex, secondIndex] = lastClickedCards;
      const firstCardUrl = images[firstIndex];
      const secondCardUrl = images[secondIndex];
      
      if (firstCardUrl === secondCardUrl) {
        console.log("Les deux dernières cartes cliquées ont le même nom.");
      } else {
        console.log("Les deux dernières cartes cliquées n'ont pas le même nom.");
        // Retourne les deux cartes après un délai
        setTimeout(() => {
          const newFlipped = [...flipped];
          newFlipped[firstIndex] = false;
          newFlipped[secondIndex] = false;
          setFlipped(newFlipped);
        }, 1500); // Délai en millisecondes
      }

      // Réinitialise le tableau des dernières cartes cliquées
      setLastClickedCards([]);
    }
  }, [lastClickedCards, images, flipped]);

  function handleClick(index) {
    // Vérifie si le jeu a commencé avant de permettre le clic sur les cartes
    if (!gameStarted) {
      return; // Sortie de la fonction sans rien faire si le jeu n'a pas commencé
    }

    // Toggle the state of the clicked card
    setCardStates(prevStates => {
      const newCardStates = [...prevStates];
      newCardStates[index] = { isFlipped: !newCardStates[index].isFlipped };
      return newCardStates;
    });
  }

  const backImage = "/public/dos_carte.jpg"; // Image de dos de la carte

  return (
    <div>
      <div id='div_images'>
        {/* Affichage des images */}
        {images.map((image, index) => (
          <ReactCardFlip key={index} isFlipped={flipped[index]} flipDirection="horizontal">
            {/* Dos de la carte */}
            <div onClick={() => handleClick(index)}>
              <img src={backImage} alt="Dos de la carte" />
            </div>
            {/* Face de la carte */}
            <div>
              <img src={image} alt="Face de la carte" />
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
}

export default Card;
