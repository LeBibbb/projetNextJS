// scripts/generateJson.js

const axios = require('axios');
const fs = require('fs');

// Fonction pour générer un prix aléatoire entre 10 et 60
const generateRandomPrice = () => {
  return (Math.random() * (60 - 10) + 10).toFixed(2); // Prix entre 10 et 60
};

axios
  .get('https://www.freetogame.com/api/games') // URL de ton API
  .then((response) => {
    // On ajoute un prix aléatoire à chaque jeu
    const gamesWithPrice = response.data.map((game) => ({
      ...game,
      price: generateRandomPrice(),
    }));

    // Sauvegarder le fichier JSON avec les prix ajoutés
    fs.writeFileSync('public/data/games.json', JSON.stringify(gamesWithPrice, null, 2));

    console.log('Données sauvegardées avec prix aléatoires dans games.json');
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des données:', error);
  });
