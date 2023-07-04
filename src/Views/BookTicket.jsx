import { Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Icons from "../Components/Icons";
import { useEffect, useState } from "react";
import Seat from "../Components/Seat";
import ErrorAlert from "../Components/ErrorAlert";
import Heading from "../Components/Heading";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function BookTicket({ isLoggedIn, token }) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_ENDPOINT}/tickets/seat/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode && data.statusCode !== 200) {
          setIsError(true);
          setMessage(data.message);
          return;
        }

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
        if (data.success) {
          setIsSuccess(true);
        }
        if (data.error) {
          setIsError(true);
          setMessage(data.message);
        }
      })
      .catch((e) => {
        setIsError(true);
        setMessage(e.message);
      });
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isSuccess) {
    return <Navigate to="/tickets" replace={true} />;
  }

  return (
    <div className="flex flex-col">
      <Heading className="mb-4">Select Seats</Heading>

      {isError ? (
        <ErrorAlert className="mb-4 w-full max-w-md">
          <p>{message}</p>
          <button
            className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
            onClick={() => setIsError(false)}
          >
            <Icons.XMark className="h-4 w-4" />
          </button>
        </ErrorAlert>
      ) : (
        ""
      )}

      {isLoading ? (
        <div className="mb-8 h-9 w-4/5 animate-pulse self-center rounded-lg bg-accent/20 md:hidden"></div>
      ) : (
        <h1 className="mb-8 text-center text-3xl font-bold md:hidden">
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
                      const seat = seats[i * 8 + j] || {
                        id: i * 8 + j,
                        reserved: false,
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
              onClick={handleClick}
              className="flex items-center justify-center rounded-3xl bg-primary px-14 py-4 text-background"
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
