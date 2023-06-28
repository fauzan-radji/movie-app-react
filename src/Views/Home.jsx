import { useEffect, useState } from "react";
import Icons from "../Components/Icons";
import MovieCard from "../Components/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const IMAGE_ENDPOINT = import.meta.env.VITE_API_IMAGE_ENDPOINT;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/discover/movie?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">React Movie App</h1>

      <form className="my-4 flex items-center gap-2 rounded-md bg-secondary px-4 py-2">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-transparent text-text outline-none placeholder:text-text/50"
        />
        <Icons.Search className="h-5 w-5 text-text" />
      </form>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {isLoading ? (
          <>
            <div className="flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <h2 className="h-6 w-2/3 rounded-md bg-accent/20"></h2>
              <p className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></p>
            </div>
            <div className="flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <h2 className="h-6 w-2/3 rounded-md bg-accent/20"></h2>
              <p className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></p>
            </div>
            <div className="flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <h2 className="h-6 w-2/3 rounded-md bg-accent/20"></h2>
              <p className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></p>
            </div>
            <div className="flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <h2 className="h-6 w-2/3 rounded-md bg-accent/20"></h2>
              <p className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></p>
            </div>
            <div className="flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <h2 className="h-6 w-2/3 rounded-md bg-accent/20"></h2>
              <p className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></p>
            </div>
            <div className="flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <h2 className="h-6 w-2/3 rounded-md bg-accent/20"></h2>
              <p className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></p>
            </div>
          </>
        ) : (
          movies.map((movie) => (
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster_url={`${IMAGE_ENDPOINT}${movie.poster_path}`}
              release_date={movie.release_date}
              key={movie.id}
            />
          ))
        )}
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
