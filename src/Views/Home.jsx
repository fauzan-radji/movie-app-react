import { useEffect, useReducer, useState } from "react";
import Icons from "../Components/Icons";
import MovieCard from "../Components/MovieCard";
import MovieCardSkeleton from "../Skeleton/MovieCard";
import Header from "../Components/Header";
import PrimaryButton from "../Components/PrimaryButton";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

export default function Home() {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/movies?page=${page}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        const newMovies = [...movies, ...data.data];
        setMovies(newMovies);
        setIsLoading(false);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }, [page]);

  return (
    <div>
      <Header>{import.meta.env.VITE_APP_NAME}</Header>

      <form className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-transparent text-text outline-none placeholder:text-text/50"
        />
        <Icons.Search className="h-5 w-5 text-text" />
      </form>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {isLoading
          ? Array(12)
              .fill()
              .map((_, i) => <MovieCardSkeleton key={i} />)
          : movies.map((movie) => (
              <MovieCard
                id={movie.id}
                price={movie.price}
                title={movie.title}
                poster={`${movie.poster}`}
                releaseDate={movie.releaseDate}
                key={movie.id}
              />
            ))}
      </div>

      <div className="mt-4 flex justify-center pb-4">
        <PrimaryButton onClick={() => setPage(page + 1)}>
          Load More
          <Icons.ArrowDown className="h-5 w-5" />
        </PrimaryButton>
      </div>
    </div>
  );
}
