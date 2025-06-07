import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const API_KEY = "10d83876919fd2325e0c543bd5cd7748";
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: API_KEY,
              query: query,
            },
          }
        );
        setResults(res.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <section className="px-4 md:px-12 py-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-orange-500">{query}</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:ring-2 hover:ring-orange-500 transition-transform duration-300"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-400">
                  {movie.release_date || "No release date"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
