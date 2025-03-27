export async function rewrites() {
    return [
      {
        source: '/api/games',
        destination: 'https://www.freetogame.com/api/games', 
      },
    ];
  }