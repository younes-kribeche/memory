// App.jsx
import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import CardShuffler from './Button';

function App() {
  const [images, setImages] = useState([
    "/img/Aelithia.jpg",
    "/img/Aeral.jpg",
    "/img/Azuraelle.jpg",
    "/img/Gollemen_de_pierre.jpg",
    "/img/Ignir.jpg",
    "/img/Kraglo.jpg",
    "/img/Le_Blex.jpg",
    "/img/Serpent_de_mer.jpg",
    "/img/Tempestel.jpg",
    "/img/Wyvern.jpg",
    "/img/Lumicervid.jpg",
    "/img/Crepuscaire.jpg",
    "/img/Aelithia.jpg",
    "/img/Aeral.jpg",
    "/img/Azuraelle.jpg",
    "/img/Gollemen_de_pierre.jpg",
    "/img/Ignir.jpg",
    "/img/Kraglo.jpg",
    "/img/Le_Blex.jpg",
    "/img/Serpent_de_mer.jpg",
    "/img/Tempestel.jpg",
    "/img/Wyvern.jpg",
    "/img/Lumicervid.jpg",
    "/img/Crepuscaire.jpg"
  ]);

  const [isFlipped, setIsFlipped] = useState(Array(images.length).fill(false));

  // Fonction pour inverser l'état de toutes les cartes
  function handleFlipAllCards() {
    const newIsFlipped = isFlipped.map(flipped => !flipped);
    setIsFlipped(newIsFlipped);
  }

  return (
    <div id="main_div">
      <h1 id="titre">Cartology</h1>
      <Card images={images} isFlipped={isFlipped} />
      <CardShuffler setImages={setImages} handleFlipAllCards={handleFlipAllCards} images={images} />
    </div>
  );
}

export default App;
