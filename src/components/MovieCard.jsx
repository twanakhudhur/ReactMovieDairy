import React, { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((fav) => fav.id === movie.id);
  });

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      if (!favorites.some((fav) => fav.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        window.dispatchEvent(new Event("favoritesUpdated"));
      }
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event("favoritesUpdated"));
    }
  }, [isFavorite, movie]);

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="rounded-lg shadow-lg h-96 overflow-hidden relative">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full text-white flex flex-col justify-between p-4 bg-black bg-opacity-50 hover:bg-opacity-75">
        <div className="header px-4">
          <h3 className="font-bold text-xl capitalize">{movie.title}</h3>
          <p className="text-gray-300 text-sm">{movie.release_date}</p>
        </div>
        <div className="body">
          <div className="flex justify-between mb-3">
            <p className="text-gray-300">{movie.vote_average.toFixed(1)}</p>
            <p>{movie.adult ? "+18" : ""}</p>
          </div>
          <div className="w-full flex gap-3 px-3 h-11">
            <button
              className="backdrop-blur-sm bg-white/30 px-5 rounded-lg hover:bg-white/50 text-red-500"
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <GoHeartFill /> : <GoHeart />}
            </button>
            <Link
              to={`/movie/${movie.id}`}
              className="bg-[#00b9ae] flex justify-center items-center rounded-lg grow bg-opacity-90 hover:bg-opacity-100"
            >
              Watch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
