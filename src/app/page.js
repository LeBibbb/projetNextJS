"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("/api/games")
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setGames(shuffled.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenue sur GameFinder</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full max-w-3xl mx-auto"
      >
        {games.length === 0 ? (
          <SwiperSlide>
            <div className="text-center text-xl">Chargement des jeux...</div>
          </SwiperSlide>
        ) : (
          games.map((game) => (
            <SwiperSlide key={game.id} className="relative">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-zinc-800 bg-opacity-10 p-7 text-white text-center">
                <h2 className="text-xl font-bold">{game.title}</h2>
                <p className="text-sm">{game.genre}</p>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
        
      
    </div>
    
  );
}
