import PropTypes from "prop-types";
import TicketSkeleton from "../Skeleton/Ticket";
import Ticket from "./Ticket";
import { useEffect, useReducer, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import AlertContainer, { ACTIONS, alertReducer } from "./AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

export default function Tickets({ name, className, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [tickets, setTickets] = useState(undefined);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/user/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        setTickets(data.data);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }, [token]);

  return (
    <>
      <AlertContainer className="mb-4" alerts={alerts} dispatch={dispatch} />

      <div
        className={twMerge(
          `flex flex-wrap items-center justify-center gap-4`,
          className
        )}
      >
        {tickets ? (
          tickets.length === 0 ? (
            <p>
              You haven&apos;t booked any tickets yet.{" "}
              <Link className="font-bold text-primary underline" to="/">
                Go book some ticket
              </Link>
            </p>
          ) : (
            tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                movie={ticket.Movie.title}
                name={name}
                seat={ticket.seatNumber}
              />
            ))
          )
        ) : (
          Array(3)
            .fill()
            .map((_, i) => <TicketSkeleton key={i} />)
        )}
      </div>
    </>
  );
}

Tickets.propTypes = {
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  className: PropTypes.string,
};
