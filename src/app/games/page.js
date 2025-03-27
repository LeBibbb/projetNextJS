"use client";

import { useEffect, useState } from "react";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetch("/data/games.json")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      })
      .catch((err) => console.error("Erreur lors de la récupération des données :", err));
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
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom ou studio..."
          className="w-full sm:w-1/2 p-2.5 text-white bg-zinc-700 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full sm:w-1/2 p-3 bg-zinc-700 border border-zinc-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{game.title}</h2>
                  <p className="text-lg font-bold text-green-400">{game.price}</p>
                </div>
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
