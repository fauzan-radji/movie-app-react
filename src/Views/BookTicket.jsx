import { useNavigate, useParams } from "react-router-dom";
import Icons from "../Components/Icons";
import { useEffect, useState } from "react";
import Seat from "../Components/Seat";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const IMAGE_ENDPOINT = import.meta.env.VITE_API_IMAGE_ENDPOINT;

export default function BookTicket() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      });
  }, [movieId]);

  function onSeatSelected(isSelected) {
    // TODO: change constant value (50) to the actual price
    setTotalPrice((prev) => (isSelected ? prev + 50 : prev - 50));
  }

  return (
    <div className="flex flex-col">
      <div className="relative my-4 flex h-8 items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center rounded-md bg-secondary px-2 py-1 text-text"
        >
          <Icons.ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-center font-bold">Select Seats</h2>
      </div>

      {isLoading ? (
        <div className="mb-8 h-9 w-4/5 animate-pulse self-center rounded-lg bg-accent/20 md:hidden"></div>
      ) : (
        <h1 className="mb-8 text-center text-3xl font-bold md:hidden">
          {movie.title} ({movie.release_date?.match(/\d{4}/)[0]})
        </h1>
      )}

      <div className="flex flex-col gap-x-8 md:flex-row">
        <div className="flex flex-1 flex-col">
          <div className="w-full max-w-sm self-center overflow-hidden">
            <div className="-mx-16 -mb-20 flex h-40 w-[calc(100%+8rem)] justify-center rounded-[100%] border-t-4 border-t-accent  pt-6 text-accent/50">
              Screen
            </div>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-4 self-center px-4">
            {Array(8)
              .fill()
              .map((_, i) => (
                <div key={i} className="flex justify-between">
                  {Array(8)
                    .fill()
                    .map((_, j) => (
                      <Seat
                        key={i * 8 + j}
                        id={`${i}-${j}`}
                        onSeatSelected={onSeatSelected}
                      />
                    ))}
                </div>
              ))}
          </div>
          <div className="my-8 flex w-full max-w-sm justify-between self-center">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-accent/30"></span>
              Available
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-text/80"></span>
              Reserved
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary"></span>
              Selected
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {isLoading ? (
            <div className="hidden h-9 w-4/5 animate-pulse self-center rounded-lg bg-accent/20 md:block"></div>
          ) : (
            <h1 className="hidden text-center text-3xl font-bold md:block">
              {movie.title} ({movie.release_date?.match(/\d{4}/)[0]})
            </h1>
          )}

          {isLoading ? (
            <div className="hidden aspect-[3/4] w-full rounded-3xl bg-accent/20 md:block landscape:aspect-video"></div>
          ) : (
            <img
              className="hidden aspect-[3/4] w-full rounded-3xl bg-accent/20 object-cover md:block landscape:aspect-video"
              src={`${IMAGE_ENDPOINT}${movie.poster_path}`}
              alt={movie.title}
            />
          )}

          <div className="mb-8 flex items-center justify-between">
            <div className="flex flex-col ">
              <span className="text-sm text-accent">Total price</span>
              <span className="text-xl font-bold text-primary">
                IDR {totalPrice}K
              </span>
            </div>
            <button className="flex items-center justify-center rounded-3xl bg-primary px-14 py-4 text-background">
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
