import {
  AlertContainer,
  Header,
  Heading,
  Icons,
  SecondaryButton,
  Ticket as TicketComponent,
} from "../Components";
import {
  Header as HeaderSkeleton,
  Ticket as TicketSkeleton,
} from "../Skeletons";
import { Navigate, useParams } from "react-router-dom";
import { formatDate, formatMovieTitle } from "../utils/formatter";
import { useEffect, useReducer, useState } from "react";

import { ACTIONS } from "../Constants";
import { alert as alertReducer } from "../Reducers";
import fetch from "../utils/fetch";
import { useAuth } from "../Context/Auth";
import { useFetch } from "../hooks";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Ticket() {
  const { isLoggedIn, token } = useAuth();
  const { ticketId } = useParams();
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const { data, isLoading, error } = useFetch(
    `${API_ENDPOINT}/tickets/${ticketId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  useEffect(() => {
    if (!error) return;

    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error.message });
  }, [error]);

  function handleClick() {
    if (isCanceling) return;

    setIsCanceling(true);
    fetch(`${API_ENDPOINT}/tickets/${ticketId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setIsCanceled(true);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }))
      .finally(() => setIsCanceling(false));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Heading>Ticket details</Heading>

      <AlertContainer className="my-0" alerts={alerts} dispatch={dispatch} />

      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        {isLoading || !data ? (
          <>
            <HeaderSkeleton className="w-80 max-w-full" />
            <TicketSkeleton className="self-center" />
          </>
        ) : (
          <>
            <Header className="py-0">
              {formatMovieTitle(
                data?.seat.movie.title,
                data?.seat.movie.releaseDate
              )}
            </Header>
            <TicketComponent
              className="self-center"
              movieTitle={data?.seat.movie.title}
              id={data?.id}
              name={data?.order.user.name}
              seat={data?.seat.number}
            />
          </>
        )}
        <div className="flex w-full flex-col gap-4 rounded-md bg-complimentary/50 px-4 py-4 shadow-lg shadow-complimentaryDark/20">
          {isLoading || !data ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-11 animate-pulse rounded bg-complimentaryDark/30"></span>
                <span className="h-5 w-2/5 animate-pulse rounded bg-complimentaryDark/30"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-11 animate-pulse rounded bg-complimentaryDark/30"></span>
                <span className="h-5 w-6 animate-pulse rounded bg-complimentaryDark/30"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-4 w-32 animate-pulse rounded bg-complimentaryDark/30"></span>
                <span className="h-5 w-24 animate-pulse rounded bg-complimentaryDark/30"></span>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-neutralContrast/60">Name</p>
                <p>{data?.order.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">Seat</p>
                <p>{data?.seat.number}</p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">
                  Transaction date
                </p>
                <p>{formatDate(data?.createdAt)}</p>
              </div>
            </>
          )}
          {(data?.isCancelled || isCanceled) && (
            <p className="font-bold text-danger-700">Canceled</p>
          )}
        </div>
        {!(data?.isCancelled || isCanceled) && (
          <SecondaryButton
            disabled={isLoading || isCanceling}
            onClick={handleClick}
          >
            {isCanceling ? (
              <>
                <Icons.Spinner className="h-5 w-5" /> Canceling...
              </>
            ) : (
              "Cancel Ticket"
            )}
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}
