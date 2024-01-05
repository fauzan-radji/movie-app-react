import { ACTIONS, HTTP } from "../Constants";
import {
  AlertContainer,
  Header,
  Icons,
  MovieCard,
  Pagination,
} from "../Components";
import { useEffect, useReducer, useRef, useState } from "react";

import { MovieCard as MovieCardSkeleton } from "../Skeletons";
import { alert as alertReducer } from "../Reducers";
import { useFetch } from "../hooks";
import { useSearchParams } from "react-router-dom";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const limit = 12;

export default function Home() {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = +searchParams.get("page");
  const inputSearch = useRef();

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
        if (data.statusCode !== HTTP.OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        setMovies(data.data);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }

  function handleChange() {
    if (!inputSearch.current.value) setMovies(data);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
        <Header>{import.meta.env.VITE_APP_NAME}</Header>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-md bg-complimentary px-4 py-2 text-complimentaryContrast"
        >
          <input
            ref={inputSearch}
            type="search"
            placeholder="Search movies..."
            onChange={handleChange}
            className="w-full bg-transparent outline-none placeholder:text-black/50"
          />
          <Icons.Search className="text-text h-5 w-5" />
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

      {!isLoading && (
        <Pagination
          currentPage={page}
          pagesToShow={2}
          totalPages={totalPages}
          onPageChange={(page) => setSearchParams({ page })}
        />
      )}
    </div>
  );
}
