"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    axios
      .get("/api/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

    const genres = Array.from(new Set(games.map((game) => game.genre))).sort();

  const filteredGames = games.filter(
    (game) =>
      (game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (game.publisher && game.publisher.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedGenre === "" || game.genre === selectedGenre)
  );

  return (
    <div className="container mx-auto p-6 flex">
      <aside className="w-1/4 p-4 bg-zinc-800 text-white rounded-lg">
        <h2 className="text-xl font-bold mb-4">Rechercher un jeu</h2>
        <input
          type="text"
          placeholder="Nom ou studio ..."
          className="w-full p-2 mb-3 text-white bg-zinc-700 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full p-2 mb-3 bg-zinc-700 border border-zinc-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </aside>

      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-6">
        {filteredGames.length === 0 ? (
          <div className="col-span-3 text-center text-xl text-gray-400">
            Aucun jeu trouvé...
          </div>
        ) : (
          filteredGames.map((game) => (
            <div key={game.id} className="bg-zinc-800 p-4 rounded-lg shadow-lg">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{game.title}</h2>
                <p className="text-sm text-orange-500">{game.genre}</p>
                {game.publisher && <p className="text-sm text-gray-400">{game.publisher}</p>}
                <p className="text-sm text-gray-500">{game.short_description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
