import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import Icons from "../Components/Icons";
import MovieCard from "../Components/MovieCard";
import MovieCardSkeleton from "../Skeleton/MovieCard";
import Header from "../Components/Header";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;
const limit = 12;

export default function Home() {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  // FIXME: use useReducer
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const inputSearch = useRef();

  // ? Is this useMemo really optimize the performance?
  const page = useMemo(() => +searchParams.get("page"), [searchParams]);
  const { data, isLoading, error, totalPages } = useFetch(
    `${API_ENDPOINT}/movies?page=${page}&limit=${limit}`
  );

  useEffect(() => {
    if (!data) return;
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (!error) return;
    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error.message });
  }, [error]);

  // FIXME: use search param for query
  function handleSubmit(e) {
    e.preventDefault();

    const query = inputSearch.current.value;
    if (!query) return;

    fetch(`${API_ENDPOINT}/movies/search?title=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        setMovies(data.data);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));

    inputSearch.current.value = "";
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
        <Header>{import.meta.env.VITE_APP_NAME}</Header>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2"
        >
          <input
            ref={inputSearch}
            type="text"
            placeholder="Search movies..."
            className="w-full bg-transparent text-text outline-none placeholder:text-text/50"
          />
          <Icons.Search className="h-5 w-5 text-text" />
        </form>
      </div>

      <AlertContainer className="my-0" alerts={alerts} dispatch={dispatch} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {isLoading
          ? Array(limit)
              .fill()
              .map((_, i) => <MovieCardSkeleton key={i} />)
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                price={movie.price}
                title={movie.title}
                poster={`${movie.poster}`}
                releaseDate={movie.releaseDate}
              />
            ))}
      </div>

      <div className="mb-4 flex justify-center self-center overflow-hidden rounded shadow-md">
        <button
          className="flex h-8 w-8 items-center justify-center bg-primary text-background"
          onClick={() => setSearchParams({ page: page - 1 })}
        >
          <Icons.ChevronLeft className="h-4 w-4" />
        </button>
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <button
              className={`flex h-8 w-8 items-center justify-center bg-secondary ${
                page === i + 1 ? "font-semibold text-text" : "text-text/50"
              }`}
              key={i + 1}
              onClick={() => setSearchParams({ page: i + 1 })}
            >
              {i + 1}
            </button>
          ))}
        <button
          className="flex h-8 w-8 items-center justify-center bg-primary text-background"
          onClick={() => setSearchParams({ page: page + 1 })}
        >
          <Icons.ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
