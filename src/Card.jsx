// Card.jsx
import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

function Card({ images, isFlipped, flipAllCards }) {
  const [flipped, setFlipped] = useState(isFlipped);

  // Met à jour l'état flipped lorsqu'il y a un changement dans isFlipped
  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  function handleClick(index) {
    // Inverse l'état de la carte cliquée
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  }

  // Retourne toutes les cartes
  function handleFlipAll() {
    const newFlipped = flipped.map(() => true);
    setFlipped(newFlipped);
  }

  const backImage = "/img/dos_carte.jpg"; // Image de dos de la carte

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
             <div onClick={() => handleClick(index)}>
              <img src={isFlipped[index] ? image : image} alt="Face de la carte" />
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
}

export default Card;
