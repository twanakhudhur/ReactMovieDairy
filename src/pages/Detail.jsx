import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Empty from "../components/Empty";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieDetails = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      setError("Error fetching movie details: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="h-full min-h-96">
      {loading && <Spinner />}
      {error && !loading && <>{error}</>}
      {!movie && !loading && <Empty message={"Movie Not Found"} />}
      {movie && (
        <div className="flex flex-wrap md:flex-nowrap gap-6 mt-5 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-64 h-auto rounded-lg"
            />
          </div>
          <div className="flex-grow pt-5 space-y-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg text-gray-300">{movie.release_date}</p>
            <p className="text-lg text-gray-300">
              {movie.vote_average.toFixed(1)}/10
            </p>
            <p className="text-gray-200">{movie.overview}</p>
            <div className="flex flex-wrap space-x-3 py-5">
              {movie.production_companies
                .filter((company) => company.logo_path)
                .map((company) => (
                  <div key={company.id} className="mr-4 mb-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-12 object-contain"
                    />
                  </div>
                ))}
            </div>
            <button className="bg-[#00b9ae] rounded-lg px-6 py-2 text-white hover:bg-opacity-90">
              Watch Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
