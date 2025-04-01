"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [games, setGames] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [cheapGames, setCheapGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Index de l'image actuelle dans le carousel

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/LeBibbb/monAPI/main/games.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des jeux.");
        }
        return response.json();
      })
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setGames(shuffled.slice(0, 5));

        const bestSellersData = data.filter((game) =>
          ["Valorant", "League of Legends", "Call Of Duty: Warzone"].includes(game.title)
        ).slice(0, 3);
        setBestSellers(bestSellersData);

        const cheapGamesData = data.filter((game) => parseFloat(game.price.replace('€', '').trim()) < 15);
        setCheapGames(cheapGamesData.sort(() => 0.5 - Math.random()).slice(0, 3));

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des jeux :", err);
        setLoading(false);
      });
  }, []);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length); 
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length); 
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval); 
  }, [games]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenue sur LATENCE GAMING</h1>

      {loading ? (
        <p className="text-center text-xl text-gray-400">Chargement des jeux...</p>
      ) : (
        <>
          {games.length > 0 && games[currentIndex] && (
            <div className="relative w-full mx-auto max-w-screen-lg">
              
              <div className="relative transition-all duration-500 ease-in-out transform">
                  <Link href={`/games/${games[currentIndex].id}`} className="block w-full h-full">
                    <img
                      src={games[currentIndex].thumbnail}
                      alt={games[currentIndex].title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-zinc-800 bg-opacity-50 p-5 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-bold">{games[currentIndex].title}</h2>
                          <p className="text-sm">{games[currentIndex].genre}</p>
                        </div>
                        <p className="text-lg font-bold text-green-400">{games[currentIndex].price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full shadow-lg hover:bg-zinc-700"
              >
                &lt;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full shadow-lg hover:bg-zinc-700"
              >
                &gt;
              </button>
            </div>
          )}

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-orange-500">Meilleures Ventes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellers.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="bg-zinc-800 p-4 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105"
                >
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{game.title}</h3>
                      <p className="text-lg font-bold text-green-400">{game.price}</p>
                    </div>
                    <p className="text-sm text-orange-500">{game.genre}</p>
                    {game.publisher && <p className="text-sm text-gray-400">{game.publisher}</p>}
                    <p className="text-sm text-gray-500">{game.short_description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-500">Jeux à moins de 15€</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cheapGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="bg-zinc-800 p-4 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105"
                >
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{game.title}</h3>
                      <p className="text-lg font-bold text-green-400">{game.price}</p>
                    </div>
                    <p className="text-sm text-orange-500">{game.genre}</p>
                    {game.publisher && <p className="text-sm text-gray-400">{game.publisher}</p>}
                    <p className="text-sm text-gray-500">{game.short_description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
