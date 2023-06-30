import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Icons from "../Components/Icons";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const IMAGE_ENDPOINT = import.meta.env.VITE_API_IMAGE_ENDPOINT;

export default function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div className="flex flex-col">
      <div className="relative my-4 flex h-8 items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center rounded-md bg-secondary px-2 py-1 text-text"
        >
          <Icons.ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-center font-bold">Movie Details</h2>
      </div>

      <div className="flex flex-col items-center gap-y-4 landscape:flex-row landscape:items-start landscape:gap-x-8">
        {isLoading ? (
          <div className="aspect-[3/4] max-h-[calc(100dvh-12rem)] w-full max-w-full animate-pulse rounded-3xl bg-accent/20 object-cover landscape:h-[calc(100dvh-12rem)] landscape:w-auto"></div>
        ) : (
          <img
            src={`${IMAGE_ENDPOINT}${movie.poster_path}`}
            alt={movie.title}
            className="aspect-[3/4] max-h-[calc(100dvh-12rem)] max-w-full rounded-3xl bg-accent/20 object-cover"
          />
        )}

        <div className="flex w-full flex-col">
          {isLoading ? (
            <div className="mb-2 h-8 w-2/3 animate-pulse rounded-md bg-accent/20"></div>
          ) : (
            <h1 className="mb-2 text-2xl font-bold">{`${movie.title} (${
              movie.release_date.match(/\d{4}/)[0]
            })`}</h1>
          )}

          <div className="mb-2 w-max rounded-md bg-accent/70 px-2 py-1 text-sm text-background">
            <Icons.PriceTag className="mr-2 inline h-4 w-4" />
            Rp. 50.000,-
          </div>

          <hr className=" border-t-2 border-t-accent" />

          <p className="my-2 text-text">
            {movie.overview || "No overview available."}
          </p>

          <Link
            to={`/movie/${movie.id}/book`}
            className="mx-auto mb-6 flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-background"
          >
            Book Ticket
          </Link>
        </div>
      </div>
    </div>
  );
}
