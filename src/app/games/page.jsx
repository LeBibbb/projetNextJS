"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);

  const darkMode = useSelector((state) => state.theme.darkMode); 
  // recup données
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/LeBibbb/monAPI/main/games.json")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données :", err);
        setLoading(false);
      });
  }, []);

  const genres = useMemo(() => {
    return Array.from(new Set(games.map((game) => game.genre))).sort();
  }, [games]);
  // usememo ca sert a memoriser une valeur pour cpas recalculer a chaque fois
  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        (game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (game.publisher &&
            game.publisher.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (selectedGenre === "" || game.genre === selectedGenre)
    );
  }, [games, searchTerm, selectedGenre]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-6 mt-15">
        <input
          type="text"
          placeholder="Rechercher par nom ou studio..."
          className={`w-full sm:w-1/2 p-2.5 border rounded focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-zinc-700 text-white border-zinc-600 focus:ring-orange-500"
              : "bg-white text-black border-gray-300 focus:ring-orange-500"
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={`w-full sm:w-1/2 p-3 border rounded focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-zinc-700 text-white border-zinc-600 focus:ring-orange-500"
              : "bg-white text-black border-gray-300 focus:ring-orange-500"
          }`}
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

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="col-span-3 text-center text-xl text-gray-400">
          Aucun jeu trouvé...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className={`transition-transform transform hover:scale-105 p-4 rounded-lg ${
                darkMode ? "bg-zinc-800" : "bg-orange-500"
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-zinc-800" : "bg-orange-500"
                }`}
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h2
                      className={`text-lg font-semibold ${
                        darkMode ? "text-white" : "text-white"
                      }`}
                    >
                      {game.title}
                    </h2>
                    <p
                      className={`text-lg font-bold ${
                        darkMode ? "text-green-400" : "text-white"
                      }`}
                    >
                      {game.price}
                    </p>
                  </div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-orange-500" : "text-white"
                    }`}
                  >
                    {game.genre}
                  </p>
                  {game.publisher && (
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-white"
                      }`}
                    >
                      {game.publisher}
                    </p>
                  )}
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-500" : "text-white"
                    }`}
                  >
                    {game.short_description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
