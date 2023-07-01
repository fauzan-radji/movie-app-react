import { useEffect, useState } from "react";
import Icons from "../Components/Icons";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header";
import PrimaryButton from "../Components/PrimaryButton";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/movie?page=${page}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        const newMovies = [...movies, ...data.data];
        setMovies(newMovies);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <div>
      <Header>{import.meta.env.VITE_APP_NAME}</Header>

      <form className="mb-4 flex items-center gap-2 rounded-md bg-secondary px-4 py-2">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-transparent text-text outline-none placeholder:text-text/50"
        />
        <Icons.Search className="h-5 w-5 text-text" />
      </form>

      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {isLoading ? (
          <>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
            <div className="relative flex aspect-[2/3] w-full animate-pulse flex-col justify-end overflow-hidden rounded-xl bg-secondary p-4">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
              <div className="h-6 w-2/3 rounded-md bg-accent/20"></div>
              <div className="my-2 h-4 w-1/3 rounded bg-accent/20 px-2 py-1"></div>
            </div>
          </>
        ) : (
          movies.map((movie) => (
            <MovieCard
              id={movie.id}
              price={movie.price}
              title={movie.title}
              poster={`${movie.poster}`}
              releaseDate={movie.releaseDate}
              key={movie.id}
            />
          ))
        )}
      </div>

      <div className="flex justify-center pb-4">
        <PrimaryButton onClick={() => setPage(page + 1)}>
          Load More
          <Icons.ArrowDown className="h-5 w-5" />
        </PrimaryButton>
      </div>
    </div>
  );
}
