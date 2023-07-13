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
import Ticket from "../Components/Ticket";
import TicketSkeleton from "../Skeleton/Ticket";
import useFetch from "../hooks/useFetch";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;

export default function TransactionDetail({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const { transactionId } = useParams();
  const [isCanceled, setIsCanceled] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const {
    data: transaction,
    error,
    isLoading,
  } = useFetch(`${API_ENDPOINT}/orders/${transactionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!transaction) return;
    setIsCanceled(transaction.ticket.every((ticket) => ticket.isCancel));
  }, [transaction]);

  useEffect(() => {
    if (!error) return;
    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error.message });
  }, [error]);

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

        setIsCanceled(true);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }))
      .finally(() => setIsCanceling(false));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col gap-4 pb-4">
      <Heading>Transaction Details</Heading>

      <AlertContainer className="my-0" alerts={alerts} dispatch={dispatch} />

      <div className="mx-auto flex w-full max-w-md flex-col">
        {isLoading ? (
          <>
            <Icons.CheckBadge className="mx-auto aspect-square w-20 animate-pulse text-complimentaryDark/30" />
            <span className="mx-auto h-6 w-32 animate-pulse rounded bg-complimentaryDark/30"></span>
            <span className="mx-auto mt-1 h-6 w-72 animate-pulse rounded bg-complimentaryDark/30"></span>
          </>
        ) : (
          <>
            {isCanceled ? (
              <>
                <Icons.XCircle className="mx-auto aspect-square w-20 text-danger-700" />
                <span className="mx-auto mb-2 w-max rounded bg-danger-300 px-1 text-center text-sm font-semibold text-danger-800">
                  Canceled
                </span>
              </>
            ) : (
              <>
                <Icons.CheckBadge className="mx-auto aspect-square w-20 text-success-700" />
                <span className="mx-auto mb-2 w-max rounded bg-success-300 px-1 text-center text-sm font-semibold text-success-800">
                  Success
                </span>
              </>
            )}
            <p className="text-center">@{transaction.User.username}</p>
            <h1 className="text-center text-lg font-bold">
              {transaction.Movie.title} (
              {transaction.Movie.releaseDate.match(/\d{4}/g)})
            </h1>
          </>
        )}

        <div className="my-4 flex flex-col gap-4 rounded-md bg-complimentary/40 px-4 py-4 shadow-lg shadow-complimentaryDark/20">
          {isLoading ? (
            <>
              <span className="h-7 w-44 animate-pulse rounded bg-complimentaryDark/30"></span>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-11 animate-pulse rounded bg-complimentaryDark/30"></span>
                <span className="h-5 w-2/5 animate-pulse rounded bg-complimentaryDark/30"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-11 animate-pulse rounded bg-complimentaryDark/30"></span>
                <span className="h-5 w-1/5 animate-pulse rounded bg-complimentaryDark/30"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-32 animate-pulse rounded bg-complimentaryDark/30"></span>
                <span className="h-5 w-24 animate-pulse rounded bg-complimentaryDark/30"></span>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-neutralContrast">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(transaction.total)}
              </h3>
              <div>
                <p className="text-sm text-neutralContrast/60">Name</p>
                <p>{transaction.User.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">Seats</p>
                <p className="flex gap-1">
                  {transaction.ticket.map((ticket) => (
                    <span
                      key={ticket.id}
                      className={`${
                        ticket.isCancel
                          ? "bg-danger-300 text-danger-700"
                          : "bg-success-300 text-success-900"
                      } rounded px-1 text-sm font-semibold`}
                    >
                      {ticket.Seats.seatNumber}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">
                  Transaction date
                </p>
                <p>
                  {/* FIXME: use useDateFormatter custom hook instead */}
                  {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                    dateStyle: "long",
                  })}
                </p>
              </div>
            </>
          )}
        </div>

        {!isCanceled && (
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
        )}
      </div>

      {/* FIXME: use Ticket Component instead */}
      <div>
        {!isLoading && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {transaction.ticket
              ? transaction.ticket.map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    movieTitle={transaction.Movie.title}
                    name={transaction.User.name}
                    seat={ticket.Seats.seatNumber}
                  />
                ))
              : Array(3)
                  .fill()
                  .map((_, i) => <TicketSkeleton key={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

TransactionDetail.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
