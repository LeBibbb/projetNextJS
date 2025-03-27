"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {axios.get("/api/games")
    .then((res) => {setGames(res.data);})
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Tous les jeux</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.length === 0 ? (
          <div className="col-span-3 text-center text-xl">Chargement des jeux...</div>
        ) : (
          games.map((game) => (
            <div key={game.id} className="bg-zinc-800 p-4 rounded-lg shadow-lg">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{game.title}</h2>
                <p className="text-sm text-orange-600">{game.genre}</p>
                <p className="text-sm text-gray-500">{game.short_description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
