
import React, { useState } from 'react';

function CardShuffler({ setImages, handleFlipAllCards, images }) {
  const buttonSwitch = { button1: "Lancer la partie !", button2: "Abandonner !" };
  const [buttonText, setButtonText] = useState(buttonSwitch.button1);
  const [showModal, setShowModal] = useState(false); // Ajout de la variable d'état showModal

  function handleClick() {
    if (buttonText === buttonSwitch.button1) {
      handleFlipAllCards(); // Retourner les cartes une première fois
      setTimeout(() => {
        handleFlipAllCards(); // Retourner les cartes une deuxième fois après un délai de 2000ms
      }, 3000); // Délai total de 3000ms pour attendre 3 secondes
      setButtonText(buttonSwitch.button2);
    } else if (buttonText === buttonSwitch.button2) {
      handleFlipAllCards();
      setButtonText(buttonSwitch.button1);
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    window.location.reload(); // Rafraîchir la page
  }

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
        {/* Modal affichant le message "Perdu" */}
        {showModal && (
        <div className="modal" >
          <div className="modal-content">
            <p data-aos="zoom-out">Perdu !</p>
            <span data-aos="zoom-out" className="close" onClick={handleCloseModal}>Continuer...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardShuffler;
