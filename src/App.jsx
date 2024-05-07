// App.jsx
import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import CardShuffler from './Button';

function App() {
  const [cardStates, setCardStates] = useState(Array(24).fill({ isFlipped: false }));
  

  // Fonction pour inverser l'état de toutes les cartes
  function handleFlipAllCards() {
    setCardStates(prevStates => {
      return prevStates.map(cardState => {
        return { isFlipped: !cardState.isFlipped };
      });
    });
  }

  return (
    <div id="main_div">
      <h1 id="titre">Cartology</h1>
      <Card cardStates={cardStates} setCardStates={setCardStates} />
      <CardShuffler handleFlipAllCards={handleFlipAllCards} />
    </div>
  );
}

export default App;
