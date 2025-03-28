"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);

  useEffect(() => {
    fetch("/data/games.json")
      .then((res) => res.json())
      .then((data) => {
        const foundGame = data.find((game) => game.id.toString() === id);
        setGame(foundGame);

        if (foundGame) {
          const sameGenreGames = data.filter((g) => g.genre === foundGame.genre && g.id !== foundGame.id);
          setRelatedGames(sameGenreGames);
        }
      })
      .catch((err) => console.error("Erreur lors de la récupération du jeu :", err));
  }, [id]);

  if (!game) return <div className="text-center text-xl p-6 text-white">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="flex flex-col mt-10 md:flex-row items-center bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-72 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        />

        <div className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-between w-full">
          <h1 className="text-4xl font-extrabold text-orange-500 mb-4">{game.title}</h1>
          <p className="text-lg text-gray-300 font-semibold">{game.genre}</p>
          <p className="text-gray-400 text-sm mb-2">{game.publisher}</p>
          <p className="text-xl text-green-400 font-bold">{game.price}</p>
          <p className="mt-4 text-gray-300 leading-relaxed">{game.short_description}</p>

          <button className="mt-6 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition self-start">
            Acheter Maintenant
          </button>
        </div>
      </div>

      <section className="mt-16 w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-500">Jeux similaires</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full mx-auto max-w-screen-xl"
        >
          {relatedGames.length === 0 ? (
            <SwiperSlide>
              <div className="text-center text-xl text-gray-400">Aucun jeu similaire trouvé...</div>
            </SwiperSlide>
          ) : (
            relatedGames.map((relatedGame) => (
              <SwiperSlide key={relatedGame.id} className="bg-zinc-800 p-4 rounded-lg shadow-lg text-white">
                <Link href={`/games/${relatedGame.id}`} >
                 
                    <img
                      src={relatedGame.thumbnail}
                      alt={relatedGame.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{relatedGame.title}</h3>
                        <p className="text-lg font-bold text-green-400">{relatedGame.price}</p>
                      </div>
                      <p className="text-sm text-orange-500">{relatedGame.genre}</p>
                      {relatedGame.publisher && <p className="text-sm text-gray-400">{relatedGame.publisher}</p>}
                      <p className="text-sm text-gray-500">{relatedGame.short_description}</p>
                    </div>
                  
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>
    </div>
  );
}
