import { ACTIONS } from "../Constants";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Ticket } from "./";
import { Ticket as TicketSkeleton } from "../Skeletons";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../Context/Auth";
import { useEffect } from "react";
import { useFetch } from "../hooks";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Tickets({
  className,
  alertDispatch: dispatch,
  excludeCancelled = false,
}) {
  const { token } = useAuth();

  const {
    data: tickets,
    error: ticketsError,
    isLoading: ticketsIsLoading,
  } = useFetch(`${API_ENDPOINT}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    console.log({ tickets, ticketsIsLoading });
  }, [tickets, ticketsIsLoading]);

  useEffect(() => {
    if (!ticketsError) return;
    dispatch({ type: ACTIONS.ERROR_PUSH, payload: ticketsError });
  }, [dispatch, ticketsError]);

  return (
    <div
      className={twMerge(
        "flex flex-wrap items-center justify-center gap-4",
        className
      )}
    >
      {ticketsIsLoading ? (
        Array(3)
          .fill()
          .map((_, i) => <TicketSkeleton key={i} />)
      ) : !tickets || tickets.length === 0 ? (
        <p>
          You haven&apos;t booked any tickets yet.{" "}
          <Link className="font-bold text-accent underline" to="/">
            Go book some ticket
          </Link>
        </p>
      ) : (
        tickets
          .filter((ticket) => !excludeCancelled || !ticket.isCancelled)
          .map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              movieTitle={ticket.seat.movie.title}
              name={ticket.order.user.name}
              seat={ticket.seat.number}
            />
          ))
      )}
    </div>
  );
}

Tickets.propTypes = {
  className: PropTypes.string,
  alertDispatch: PropTypes.func,
  excludeCancelled: PropTypes.bool,
};
