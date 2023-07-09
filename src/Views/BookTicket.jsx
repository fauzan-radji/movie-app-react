import { Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Icons from "../Components/Icons";
import { useEffect, useReducer } from "react";
import Seat from "../Components/Seat";
import Heading from "../Components/Heading";
import AlertContainer, {
  ACTIONS as ALERT_ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import PrimaryButton from "../Components/PrimaryButton";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;
const HTTP_OK = 200;

const ACTIONS = {
  SET_MOVIE: "set-movie",
  SET_SEATS: "set-seats",
  SET_SELECTED_SEATS: "set-selected-seats",
  SET_IS_LOADING: "set-is-loading",
  SET_TOTAL_PRICE: "set-total-price",
  SET_PRICE: "set-price",
  SET_IS_SUCCESS: "set-is-success",
  SET_TRANSACTION_ID: "set-transaction-id",
  SET_IS_SENDING: "set-is-sending",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_MOVIE:
      return { ...state, movie: action.payload };
    case ACTIONS.SET_SEATS:
      return { ...state, seats: action.payload };
    case ACTIONS.SET_SELECTED_SEATS:
      return { ...state, selectedSeats: action.payload };
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    case ACTIONS.SET_PRICE:
      return { ...state, price: action.payload };
    case ACTIONS.SET_IS_SUCCESS:
      return { ...state, isSuccess: action.payload };
    case ACTIONS.SET_TRANSACTION_ID:
      return { ...state, transactionId: action.payload };
    case ACTIONS.SET_IS_SENDING:
      return { ...state, isSending: action.payload };
    default:
      return state;
  }
}

export default function BookTicket({ isLoggedIn, token }) {
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);
  const { movieId } = useParams();

  const [
    {
      movie,
      seats,
      selectedSeats,
      isLoading,
      totalPrice,
      price,
      isSuccess,
      transactionId,
      isSending,
    },
    dispatch,
  ] = useReducer(reducer, {
    movie: {},
    seats: {},
    selectedSeats: [],
    isLoading: true,
    totalPrice: 0,
    price: 0,
    isSuccess: false,
    transactionId: "",
    isSending: false,
  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/tickets/seat/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          alertsDispatch({
            type: ALERT_ACTIONS.ERROR_PUSH,
            payload: data.message,
          });
          return;
        }

        data = data.seats;
        data.title = `${data.title} (${data.releaseDate.match(/\d{4}/)[0]})`;
        dispatch({
          type: ACTIONS.SET_MOVIE,
          payload: {
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            releaseDate: data.releaseDate,
            ageRating: data.ageRating,
            poster: data.poster,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        });
        dispatch({ type: ACTIONS.SET_SEATS, payload: data.seats });
        dispatch({
          type: ACTIONS.SET_PRICE,
          payload: Math.round(data.price / 1000),
        });
        dispatch({ type: ACTIONS.SET_IS_LOADING, payload: false });
      });
  }, [movieId]);

  function onSeatSelected(isSelected, seatNumber) {
    const newSelectedSeats = [...selectedSeats];
    if (isSelected) {
      dispatch({ type: ACTIONS.SET_TOTAL_PRICE, payload: totalPrice + price });
      if (!selectedSeats.includes(seatNumber)) {
        newSelectedSeats.push(seatNumber);
      }
    } else {
      dispatch({ type: ACTIONS.SET_TOTAL_PRICE, payload: totalPrice - price });
      if (selectedSeats.includes(seatNumber)) {
        newSelectedSeats.splice(newSelectedSeats.indexOf(seatNumber), 1);
      }
    }

    dispatch({ type: ACTIONS.SET_SELECTED_SEATS, payload: newSelectedSeats });
  }

  function handleClick() {
    if (isSending) return;

    dispatch({ type: ACTIONS.SET_IS_SENDING, payload: true });
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
          alertsDispatch({
            type: ALERT_ACTIONS.ERROR_PUSH,
            payload: data.message,
          });
          return;
        }

        alertsDispatch({
          type: ALERT_ACTIONS.SUCCESS_PUSH,
          payload: data.message,
        });
        dispatch({ type: ACTIONS.SET_IS_SUCCESS, payload: true });
        dispatch({
          type: ACTIONS.SET_TRANSACTION_ID,
          payload: data.ordersId.id,
        });
      })
      .catch((e) =>
        alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: e.message })
      )
      .finally(() =>
        dispatch({ type: ACTIONS.SET_IS_SENDING, payload: false })
      );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;
  if (isSuccess) return <Navigate to={`/transactions/${transactionId}`} />;

  return (
    <div className="flex flex-col">
      <Heading>Select Seats</Heading>

      <AlertContainer alerts={alerts} dispatch={alertsDispatch} />

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
                      const currentSeatIndex = i * 8 + j;
                      const seat = seats[currentSeatIndex] || {
                        id: currentSeatIndex,
                        book: false,
                        seatNumber: currentSeatIndex + 1,
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
            <PrimaryButton
              disabled={isLoading || isSending || selectedSeats.length === 0}
              onClick={handleClick}
              className="px-6 py-4"
            >
              {isSending ? (
                <Icons.Spinner className="h-5 w-5" />
              ) : (
                <Icons.Ticket className="h-5 w-5" />
              )}{" "}
              Book Ticket
            </PrimaryButton>
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
