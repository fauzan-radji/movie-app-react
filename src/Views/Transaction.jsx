import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import { Navigate, useParams } from "react-router-dom";
import Icons from "../Components/Icons";
import SecondaryButton from "../Components/SecondaryButton";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;
const HTTP_CREATED = 201;

export default function TransactionDetail({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  // TODO: add canceled state for canceled order

  useEffect(() => {
    fetch(`${API_ENDPOINT}/orders/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        const order = data.data;
        order.seats = order.ticket.map((ticket) => ticket.Seats);
        setTransaction(order);
        setIsLoading(false);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }, [transactionId, token]);

  function handleClick() {
    if (isCanceling) return;

    setIsCanceling(true);
    fetch(`${API_ENDPOINT}/orders/cancel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticketsId: transaction.ticket.map((ticket) => ticket.id),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_CREATED) {
          if (Array.isArray(data.message)) {
            data.message.forEach((message) => {
              dispatch({ type: ACTIONS.ERROR_PUSH, payload: message });
            });
            return;
          }

          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        setIsCancelled(true);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }))
      .finally(() => setIsCanceling(false));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (isCancelled) return <Navigate to="/transactions" replace />;

  return (
    <div className="flex flex-col">
      <Heading>Transaction Details</Heading>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      <div className="mx-auto mb-4 flex w-full max-w-md flex-col">
        {isLoading ? (
          <>
            <Icons.CheckBadge className="mx-auto aspect-square w-20 animate-pulse text-accent/20" />
            <span className="mx-auto h-6 w-32 animate-pulse rounded bg-accent/20"></span>
            <span className="mx-auto mt-1 h-6 w-72 animate-pulse rounded bg-accent/20"></span>
          </>
        ) : (
          <>
            <Icons.CheckBadge className="mx-auto aspect-square w-20 text-success-700" />
            <p className="text-center">@{transaction.User.username}</p>
            <h1 className="text-center text-lg font-bold">
              {transaction.Movie.title} (
              {transaction.Movie.releaseDate.match(/\d{4}/g)})
            </h1>
          </>
        )}

        <div className="my-4 flex flex-col gap-4 rounded-md bg-secondary/50 px-4 py-4 shadow-lg shadow-accent/30">
          {isLoading ? (
            <>
              <span className="h-7 w-44 animate-pulse rounded bg-accent/20"></span>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-11 animate-pulse rounded bg-accent/20"></span>
                <span className="h-5 w-2/5 animate-pulse rounded bg-accent/20"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-11 animate-pulse rounded bg-accent/20"></span>
                <span className="h-5 w-1/5 animate-pulse rounded bg-accent/20"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-32 animate-pulse rounded bg-accent/20"></span>
                <span className="h-5 w-24 animate-pulse rounded bg-accent/20"></span>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl text-accent">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(transaction.total)}
              </h3>
              <div>
                <p className="text-sm text-text/60">Name</p>
                <p>{transaction.User.name}</p>
              </div>
              <div>
                <p className="text-sm text-text/60">Seats</p>
                <p>
                  {transaction.seats.map((seat) => seat.seatNumber).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-text/60">Transaction date</p>
                <p>
                  {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                    dateStyle: "long",
                  })}
                </p>
              </div>
            </>
          )}
        </div>

        <SecondaryButton
          disabled={isCanceling || isLoading}
          onClick={handleClick}
        >
          {isCanceling ? (
            <>
              <Icons.Spinner className="h-5 w-5" /> Canceling...
            </>
          ) : (
            "Cancel Order"
          )}
        </SecondaryButton>
      </div>
    </div>
  );
}

TransactionDetail.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
