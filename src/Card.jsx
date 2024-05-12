//Card.jsx
import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

function Card({ cardStates, setCardStates, gameStarted }){  
  // Tableau des chemins d'accès des images
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

  // État pour gérer les images mélangées
  const [shuffledImages, setShuffledImages] = useState([]);
  // État pour gérer l'état de retournement des cartes
  const [flipped, setFlipped] = useState(Array(24).fill(false));
  // État pour stocker l'index de la dernière carte cliquée
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  // État pour stocker les indexes des paires de cartes déjà retournées
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  // État pour afficher la modal de victoire
  const [showModalWin, setShowModalWin] = useState(false);

  // Effet pour mélanger les images et initialiser l'état des cartes
  useEffect(() => {
    const shuffled = shuffleArray(images); 
    setShuffledImages(shuffled);
    const initialCardStates = shuffled.map(image => ({ isFlipped: false }));
    setCardStates(initialCardStates);
  }, []);

  // Effet pour synchroniser l'état de retournement des cartes avec l'état global
  useEffect(() => {
    setFlipped(cardStates.map(card => card.isFlipped));
  }, [cardStates]);

  // Effet pour détecter la fin du jeu
  useEffect(() => {
    if (gameStarted) {
      const allCardsFlipped = cardStates.every(card => card.isFlipped);
      if (allCardsFlipped === true) {
        setShowModalWin(true);
        console.log("Toutes les cartes sont retournées");
        console.log("Affichage de la modal de victoire");
      }
    }
  }, [cardStates, gameStarted]);

  // Fonction pour mélanger un tableau
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Fonction pour gérer le clic sur une carte
  function handleClick(index) {
    if (gameStarted && !matchedIndexes.includes(index)) {
      if (lastClickedIndex !== null && lastClickedIndex !== index) {
        const lastClickedImageUrl = shuffledImages[lastClickedIndex];
        const currentClickedImageUrl = shuffledImages[index];
        if (lastClickedImageUrl === currentClickedImageUrl) {
          setMatchedIndexes(prevIndexes => [...prevIndexes, lastClickedIndex, index]);
        } else {
          setTimeout(() => {
            setCardStates(prevStates => {
              const newCardStates = [...prevStates];
              newCardStates[lastClickedIndex] = { isFlipped: false };
              newCardStates[index] = { isFlipped: false };
              return newCardStates;
            });
          }, 1000);
        }
  
        setLastClickedIndex(null);
      } else {
        setLastClickedIndex(index);
      }
  
      setCardStates(prevStates => {
        const newCardStates = [...prevStates];
        newCardStates[index] = { isFlipped: !prevStates[index].isFlipped };
        return newCardStates;
      });
  
      // Vérifie si toutes les cartes sont retournées
      const allCardsFlipped = cardStates.every(card => card.isFlipped);
      if (allCardsFlipped === true) {
        setShowModalWin(true);
        console.log("Toutes les cartes sont retournées");
        console.log("Affichage de la modal de victoire");
      }
      console.log(allCardsFlipped);
    }
  }

  // Fonction pour fermer la modal de victoire
  function handleCloseModal() {
    setShowModalWin(false);
    window.location.reload(); // Recharger la page pour réinitialiser le jeu
  }

  // Chemin d'accès de l'image de dos de carte
  const backImage = "/public/dos_carte.jpg";

  return (
    <div>
      <div id='div_images'>
        {shuffledImages.map((image, index) => (
          <ReactCardFlip key={index} isFlipped={flipped[index]} flipDirection="horizontal">
            <div onClick={() => handleClick(index)}>
              <img src={backImage} alt="Dos de la carte" id='images_verso'/>
            </div>
            <div>
              <img src={image} alt="Face de la carte" />
            </div>
          </ReactCardFlip>
        ))}
      </div>
      {/* Afficher la modal de victoire si showModalWin est vrai */}
      {showModalWin && (
        <div className="modal">
          <div className="modal-content modalWin">
            <p data-aos="zoom-out">Gagné !</p>
            <span data-aos="zoom-out" className="close" onClick={handleCloseModal}>Recommencer...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
