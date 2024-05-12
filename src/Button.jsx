//Button.jsx

import React, { useState, useEffect } from 'react';

function Button({ handleFlipAllCards, setGameStarted, showModalWin, handleModalWin }) {
  // Objets pour gérer les textes des boutons
  const buttonSwitch = { button1: "Lancer la partie !", button2: "Abandonner !" };
  // État du texte du bouton
  const [buttonText, setButtonText] = useState(buttonSwitch.button1);
  // État pour afficher la modal de défaite
  const [showModalLose, setShowModalLose] = useState(false);
  // État pour afficher le timer
  const [showTimer, setShowTimer] = useState(false);
  // État du timer
  const [timer, setTimer] = useState(10);
  // État du timer de la modal de victoire
  const [timer2, setTimer2] = useState(0);
  // Variable pour stocker l'ID de l'intervalle
  let interval;

  // Effet pour gérer le décompte du timer
  useEffect(() => {
    // Si le bouton est celui de lancement de partie
    if (buttonText === buttonSwitch.button2) {
      // Lancer le décompte
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 0) {
            clearInterval(interval); // Arrête le décompte lorsque le timer atteint zéro
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      // Sinon, arrêter le décompte
      clearInterval(interval);
    }
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [buttonText, buttonSwitch.button1]);

  // Effet pour arrêter le timer2 lorsque la modal de victoire est affichée
  useEffect(() => {
    if (showModalWin) {
      clearInterval(interval); // Arrête le timer2 lorsque la modal de victoire est affichée
    }
  }, [showModalWin]);  

  // Fonction gérant le clic sur le bouton
  function handleClick() {
    if (buttonText === buttonSwitch.button1) {
      handleFlipAllCards(); // Retourner toutes les cartes
      setTimeout(() => {
        setGameStarted(true); // Démarrer la partie après un délai de 11 secondes
      }, 11000);
      setTimeout(() => {
        handleFlipAllCards(); // Retourner toutes les cartes après un délai de 10 secondes
      }, 10000);
      setTimeout(() => {
        setShowTimer(true); // Afficher le timer après un délai de 10 secondes
      }, 10000)
      setButtonText(buttonSwitch.button2); // Changer le texte du bouton
    } else if (buttonText === buttonSwitch.button2) {
      setButtonText(buttonSwitch.button1); // Changer le texte du bouton
      setShowModalLose(true); // Afficher la modal de défaite
    }
  }

  // Fonction pour fermer la modal de défaite
  function handleCloseModal() {
    setShowModalLose(false);
    window.location.reload(); // Recharger la page pour réinitialiser le jeu
  }

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      {/* Afficher la modal de défaite si showModalLose est vrai */}
      {showModalLose && (
        <div className="modal">
          <div className="modal-content modalLose">
            <p data-aos="zoom-out">Perdu !</p>
            <span data-aos="zoom-out" className="close" onClick={handleCloseModal}>Réessayer...</span>
          </div>
        </div>
      )}
      {/* Afficher le timer si le bouton est celui d'abandon et que le timer est supérieur à 0 */}
      {buttonText === buttonSwitch.button2 && timer > 0 && <p id='timer' data-aos="zoom-in">{timer}</p>}
    </div>
  );
}

export default Button;
