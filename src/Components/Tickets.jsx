import PropTypes from "prop-types";
import TicketSkeleton from "../Skeleton/Ticket";
import Ticket from "./Ticket";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import Icons from "./Icons";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

export default function Tickets({ name, className, token }) {
  const [tickets, setTickets] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_ENDPOINT}/user/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          setError(data.message);
          return;
        }

        setTickets(data.data);
      })
      .catch((e) => setError(e.message));
  }, [token]);

  return (
    <>
      {error ? (
        <ErrorAlert className="mb-4 w-full max-w-md">
          <p>{error}</p>
          <button
            className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
            onClick={() => setError("")}
          >
            <Icons.XMark className="h-4 w-4" />
          </button>
        </ErrorAlert>
      ) : (
        ""
      )}

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
