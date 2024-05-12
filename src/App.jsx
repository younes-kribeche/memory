// App.jsx
import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import Button from './Button';

function App() {
  // État pour gérer l'état de chaque carte
  const [cardStates, setCardStates] = useState(Array(24).fill({ isFlipped: false }));
  // Variable d'état pour suivre si le jeu a démarré
  const [gameStarted, setGameStarted] = useState(false);

  // Fonction pour retourner toutes les cartes
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
      {/* Composant Card pour afficher les cartes */}
      <Card cardStates={cardStates} setCardStates={setCardStates} gameStarted={gameStarted}/>
      {/* Composant Button pour gérer le bouton de démarrage/abandon du jeu */}
      <Button handleFlipAllCards={handleFlipAllCards} setGameStarted={setGameStarted}/>
    </div>
  );
}

export default App;
