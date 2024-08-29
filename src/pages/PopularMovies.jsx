import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import Empty from "../components/Empty";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchTerm } = useOutletContext();

  const fetchMovies = () => {
    setLoading(true);

    const url = searchTerm
      ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm
        )}&page=${page}`
      : `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, page]);

  return (
    <div className="h-full min-h-96">
      <h1 className="text-3xl font-semibold mb-4 text-white mt-5">
        Popular Movies
      </h1>
      {loading && <Spinner />}
      {error && !loading && <>{error}</>}
      {movies.length === 0 && !loading && (
        <Empty message={searchTerm && `No data Found for: ${searchTerm}`} />
      )}
      <div
        id="favoritesGrid"
        className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!loading && movies.length && (
        <button
          onClick={handleLoadMore}
          className="bg-primary bg-opacity-80 hover:bg-opacity-95 text-white px-4 py-2 rounded my-5 w-full"
        >
          Load More
        </button>
      )}
    </div>
  );
}
