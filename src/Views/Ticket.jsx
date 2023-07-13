import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import Header from "../Components/Header";
import HeaderSkeleton from "../Skeleton/Header";
import { Navigate, useParams } from "react-router-dom";
import TicketComponent from "../Components/Ticket";
import TicketSkeleton from "../Skeleton/Ticket";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import SecondaryButton from "../Components/SecondaryButton";
import useFetch from "../hooks/useFetch";
import Icons from "../Components/Icons";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;

export default function Ticket({ isLoggedIn, token }) {
  const { ticketId } = useParams();
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const { data, isLoading, error } = useFetch(
    `${API_ENDPOINT}/user/tickets/${ticketId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

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
      body: JSON.stringify({ ticketsId: [ticketId] }),
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
              {data?.Seats.Movie.title} (
              {data?.Seats.Movie.releaseDate.match(/\d{4}/)})
            </Header>
            <TicketComponent
              className="self-center"
              movieTitle={data?.Seats.Movie.title}
              id={ticketId}
              name={data?.User.name}
              seat={data?.Seats.seatNumber}
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
                <p>{data?.User.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">Seat</p>
                <p>{data?.Seats.seatNumber}</p>
              </div>
              <div>
                <p className="text-sm text-neutralContrast/60">
                  Transaction date
                </p>
                {/* FIXME: use date Formatter */}
                <p>
                  {new Date(data.bookAt).toLocaleDateString("id-ID", {
                    dateStyle: "long",
                  })}
                </p>
              </div>
            </>
          )}
          {(data?.isCancel || isCanceled) && (
            <p className="font-bold text-danger-700">Canceled</p>
          )}
        </div>
        {!(data?.isCancel || isCanceled) && (
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

Ticket.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
