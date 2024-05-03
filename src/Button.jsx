// Button.jsx
import React from 'react';

function CardShuffler({ setImages, handleFlipAllCards, images }) { // Ajout de "images" en tant que paramètre
  function handleShuffle() {
    // Mélanger les images
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
  }

  return (
    <div>
      <button onClick={() => { handleShuffle(); handleFlipAllCards(); }}>Mélanger les cartes</button>
    </div>
  );
}

export default CardShuffler;
