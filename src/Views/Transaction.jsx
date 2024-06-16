import {
  AlertContainer,
  Heading,
  Icons,
  SecondaryButton,
  Ticket,
} from "../Components";
import { Navigate, useParams } from "react-router-dom";
import {
  formatCurrency,
  formatDate,
  formatMovieTitle,
} from "../utils/formatter";
import { useEffect, useReducer, useState } from "react";

import { ACTIONS } from "../Constants";
import { Ticket as TicketSkeleton } from "../Skeletons";
import { alert as alertReducer } from "../Reducers";
import fetch from "../utils/fetch";
import { useAuth } from "../Context/Auth";
import { useFetch } from "../hooks";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function TransactionDetail() {
  const { isLoggedIn, token } = useAuth();
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const { transactionId } = useParams();
  const [isCancelled, setIsCanceled] = useState(false);
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
    setIsCanceled(transaction.tickets.every((ticket) => ticket.isCancelled));
  }, [transaction]);

  useEffect(() => {
    if (!error) return;
    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error });
  }, [error]);

  function handleClick() {
    if (isCanceling) return;

    setIsCanceling(true);
    fetch(`${API_ENDPOINT}/orders/${transactionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
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
            {isCancelled ? (
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
            <p className="text-center">@{transaction.user.username}</p>
            <h1 className="text-center text-lg font-bold">
              {formatMovieTitle(
                transaction.tickets[0].seat.movie.title,
                transaction.tickets[0].seat.movie.releaseDate
              )}
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
                {formatCurrency(transaction.total)}
              </h3>
              <div>
                <p className="text-sm text-neutralContrast/60">Name</p>
                <p>{transaction.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">Seats</p>
                <p className="flex gap-1">
                  {transaction.tickets.map((ticket) => (
                    <span
                      key={ticket.id}
                      className={`${
                        isCancelled || ticket.isCancelled
                          ? "bg-danger-300 text-danger-700"
                          : "bg-success-300 text-success-900"
                      } rounded px-1 text-sm font-semibold`}
                    >
                      {ticket.seat.number}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">
                  Transaction date
                </p>
                <p>{formatDate(transaction.createdAt)}</p>
              </div>
            </>
          )}
        </div>

        {!isCancelled && (
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
            {/* FIXME: there is no way transation.tickets is falsy */}
            {transaction.tickets
              ? transaction.tickets.map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    movieTitle={ticket.seat.movie.title}
                    name={transaction.user.name}
                    seat={ticket.seat.number}
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
