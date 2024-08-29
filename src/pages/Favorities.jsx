import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Empty from "../components/Empty";
import Spinner from "../components/Spinner";
import { useOutletContext } from "react-router-dom";

export default function Favorities() {
  const [loading, setLoading] = useState(false);
  const { searchTerm } = useOutletContext();
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    setLoading(true);
    const handleStorageChange = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    };

    window.addEventListener("favoritesUpdated", handleStorageChange);
    setLoading(false);
    return () => {
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [searchTerm]);
  return (
    <div className="h-full min-h-96">
      <h1 className="text-3xl font-semibold mb-4 text-white mt-5">
        My Favorites
      </h1>
      {loading && <Spinner />}
      {filteredFavorites.length === 0 && !loading && (
        <Empty
          message={
            searchTerm
              ? `No data Found for: ${searchTerm}`
              : "You have not added any favorites yet."
          }
        />
      )}
      {filteredFavorites.length && (
        <div
          id="favoritesGrid"
          className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6"
        >
          {filteredFavorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
