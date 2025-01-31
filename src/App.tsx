import { useEffect, useState } from "react";

import MoviesData from "./assets/movies.json";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState(MoviesData.Search);
  const [searchQuery, setSearchQuery] = useState("");
  const [inpValue, setInpValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=2cead3e&s=${searchQuery}`
      )
      .then((res) => {
        setMovies(res.data.Search || res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(() => setLoading(false));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🎬 Movie Search</h1>

      {/* Search Bar */}
      <div className="w-full max-w-md flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setInpValue(e.target.value)}
        />
        <button
          onClick={() => {
            setSearchQuery(inpValue);
          }}
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Movie List */}
      <div className="flex justify-center w-full mt-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
                  }
                  alt={movie.Title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h1 className="text-lg font-semibold text-gray-900">
                    {movie.Title}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    🎬 {movie.Type} | 📅 {movie.Year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
