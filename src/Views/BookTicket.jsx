import { Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Icons from "../Components/Icons";
import { useEffect, useReducer, useState } from "react";
import Seat from "../Components/Seat";
import Heading from "../Components/Heading";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;
const HTTP_OK = 200;

export default function BookTicket({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const { movieId } = useParams();

  // FIXME: useReducer
  const [movie, setMovie] = useState({});
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    fetch(`${API_ENDPOINT}/tickets/seat/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        data = data.seats;
        data.title = `${data.title} (${data.releaseDate.match(/\d{4}/)[0]})`;
        setMovie({
          id: data.id,
          title: data.title,
          description: data.description,
          price: data.price,
          releaseDate: data.releaseDate,
          ageRating: data.ageRating,
          poster: data.poster,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
        setSeats(data.seats);
        setPrice(Math.round(data.price / 1000));
        setIsLoading(false);
      });
  }, [movieId]);

  function onSeatSelected(isSelected, seatNumber) {
    const newSelectedSeats = [...selectedSeats];
    if (isSelected) {
      setTotalPrice((prev) => prev + price);
      if (!selectedSeats.includes(seatNumber)) {
        newSelectedSeats.push(seatNumber);
      }
    } else {
      setTotalPrice((prev) => prev - price);
      if (selectedSeats.includes(seatNumber)) {
        newSelectedSeats.splice(newSelectedSeats.indexOf(seatNumber), 1);
      }
    }

    setSelectedSeats(newSelectedSeats);
  }

  function handleClick() {
    fetch(`${API_ENDPOINT}/tickets/seat/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        seatNumber: selectedSeats,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_CREATED) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        dispatch({ type: ACTIONS.SUCCESS_PUSH, payload: data.message });
        setIsSuccess(true);
        setTransactionId(data.ordersId.id);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;
  if (isSuccess) return <Navigate to={`/transactions/${transactionId}`} />;

  return (
    <div className="flex flex-col">
      <Heading>Select Seats</Heading>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      {isLoading ? (
        <div className="mb-8 mt-4 h-9 w-4/5 animate-pulse self-center rounded-lg bg-accent/20 md:hidden"></div>
      ) : (
        <h1 className="mb-8 mt-4 text-center text-3xl font-bold md:hidden">
          {movie.title}
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
                    .map((_, j) => {
                      // FIXME: refactor the magic number (i * 8 + j)
                      const seat = seats[i * 8 + j] || {
                        id: i * 8 + j,
                        book: false,
                        seatNumber: i * 8 + j,
                      };

                      return (
                        <Seat
                          key={seat.id}
                          id={`${i}-${j}`}
                          reserved={seat.book}
                          number={seat.seatNumber}
                          onSeatSelected={(isSelected) =>
                            onSeatSelected(isSelected, seat.seatNumber)
                          }
                        />
                      );
                    })}
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
              {movie.title}
            </h1>
          )}

          {isLoading ? (
            <div className="relative hidden aspect-[3/4] w-full animate-pulse rounded-3xl bg-accent/20 md:block landscape:aspect-video">
              <Icons.Image className="absolute inset-0 m-auto h-12 w-12 text-accent/20"></Icons.Image>
            </div>
          ) : (
            <img
              className="hidden aspect-[3/4] w-full rounded-3xl bg-accent/20 object-cover md:block landscape:aspect-video"
              src={`${movie.poster}`}
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
            <button
              disabled={isLoading}
              onClick={handleClick}
              className="flex items-center justify-center rounded-lg bg-primary px-6 py-4 text-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-primary/60"
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

BookTicket.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
