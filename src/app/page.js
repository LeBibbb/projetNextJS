"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [games, setGames] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [cheapGames, setCheapGames] = useState([]);

  useEffect(() => {
    fetch("/data/games.json")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setGames(shuffled.slice(0, 5));
        const bestSellersData = data
          .filter((game) =>
            ["Valorant", "League of Legends", "Call Of Duty: Warzone"].includes(game.title)
          )
          .slice(0, 3);
        setBestSellers(bestSellersData);
        const cheapGamesData = data.filter((game) => parseFloat(game.price.replace('€', '').trim()) < 15);
        const randomCheapGames = cheapGamesData.sort(() => 0.5 - Math.random()).slice(0, 3);
        setCheapGames(randomCheapGames);
      })
      .catch((err) => console.error("Erreur lors de la récupération des jeux :", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenue sur LATENCE GAMING</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full mx-auto max-w-screen-lg"
      >
        {games.length === 0 ? (
          <SwiperSlide>
            <div className="text-center text-xl">Chargement des jeux...</div>
          </SwiperSlide>
        ) : (
          games.map((game) => (
            <SwiperSlide key={game.id} className="relative">
              <Link href={`/games/${game.id}`} className="block w-full h-full">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-zinc-800 bg-opacity-50 p-5 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">{game.title}</h2>
                      <p className="text-sm">{game.genre}</p>
                    </div>
                    <p className="text-lg font-bold text-green-400">{game.price}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-500">Meilleures Ventes</h2>
        <div className="mx-auto max-w-screen-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.length === 0 ? (
              <div className="col-span-3 text-center text-xl text-gray-400">
                Aucun jeu trouvé...
              </div>
            ) : (
              bestSellers.map((game) => (
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
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-500">Jeux à moins de 15€</h2>
        <div className="mx-auto max-w-screen-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cheapGames.length === 0 ? (
              <div className="col-span-3 text-center text-xl text-gray-400">
                Aucun jeu trouvé...
              </div>
            ) : (
              cheapGames.map((game) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
