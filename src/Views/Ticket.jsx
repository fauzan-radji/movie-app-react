import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import Header from "../Components/Header";
import HeaderSkeleton from "../Skeleton/Header";
import { Navigate, useParams } from "react-router-dom";
import TicketComponent from "../Components/Ticket";
import TicketSkeleton from "../Skeleton/Ticket";
import { useEffect, useReducer } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import SecondaryButton from "../Components/SecondaryButton";
import useFetch from "../hooks/useFetch";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Ticket({ isLoggedIn, token }) {
  const { ticketId } = useParams();
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const { data, isLoading, error } = useFetch(
    `${API_ENDPOINT}/user/tickets/${ticketId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  useEffect(() => {
    if (!error) return;

    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error.message });
  }, [error]);

  // TODO: cancel ticket
  function handleClick() {}

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto mb-4 flex w-full max-w-md flex-col gap-4">
      <Heading>Ticket details</Heading>

      <AlertContainer className="my-0" alerts={alerts} dispatch={dispatch} />

      {isLoading ? (
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

      <div className="flex flex-col gap-4 rounded-md bg-secondary/50 px-4 py-4 shadow-lg shadow-accent/30">
        {isLoading ? (
          <>
            <div className="flex flex-col gap-1">
              <span className="h-4 w-11 animate-pulse rounded bg-accent/20"></span>
              <span className="h-5 w-2/5 animate-pulse rounded bg-accent/20"></span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="h-4 w-11 animate-pulse rounded bg-accent/20"></span>
              <span className="h-5 w-6 animate-pulse rounded bg-accent/20"></span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="h-4 w-32 animate-pulse rounded bg-accent/20"></span>
              <span className="h-5 w-24 animate-pulse rounded bg-accent/20"></span>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-text/60">Name</p>
              <p>{data?.User.name}</p>
            </div>
            <div>
              <p className="text-sm text-text/60">Seat</p>
              <p>{data?.Seats.seatNumber}</p>
            </div>
            <div>
              <p className="text-sm text-text/60">Transaction date</p>
              {/* FIXME: use the createdAt property */}
              <p>Rabu 21 Juli 2021</p>
            </div>
          </>
        )}
        {data?.isCancel && (
          <p className="font-bold text-danger-700">Canceled</p>
        )}
      </div>

      <SecondaryButton
        disabled={isLoading || data?.isCancel}
        onClick={handleClick}
      >
        Cancel Ticket
      </SecondaryButton>
    </div>
  );
}

Ticket.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
