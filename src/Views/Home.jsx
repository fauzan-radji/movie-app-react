import { useEffect, useState } from "react";
import Icons from "../Components/Icons";
import MovieCard from "../Components/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // fetch movies
    fetch(`${API_ENDPOINT}/discover/movie?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  return (
    <div>
      <h1 className="container mx-auto my-4 text-center text-2xl font-bold">
        React Movie App
      </h1>

      <div className="container mx-auto px-4">
        <form className="my-4 flex items-center gap-2 rounded-md bg-secondary px-4 py-2">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full bg-transparent text-text outline-none placeholder:text-text/50"
          />
          <Icons.Search className="h-5 w-5 text-text" />
        </form>
      </div>

      <div className="container mx-auto grid grid-cols-2 gap-4 px-4 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard
            title={movie.title}
            poster_url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            release_date={movie.release_date}
            key={movie.id}
          />
        ))}
      </div>

      <div className="flex">
        <button className="mx-auto my-4 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-background">
          Load More
          <Icons.ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
