const axios = require('axios');
const fs = require('fs');

const generateRandomPrice = () => {
  return (Math.random() * (60 - 10) + 10).toFixed(2); 
};

axios
  .get('https://www.freetogame.com/api/games') 
  .then((response) => {
    const gamesWithPrice = response.data.map((game) => ({
      ...game,
      price: generateRandomPrice(),
    }));

    fs.writeFileSync('public/data/games.json', JSON.stringify(gamesWithPrice, null, 2));

    console.log('Données sauvegardées avec prix aléatoires dans games.json');
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des données:', error);
  });
