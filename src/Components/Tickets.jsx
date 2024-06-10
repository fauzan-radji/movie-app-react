import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Ticket } from "./";
import { Ticket as TicketSkeleton } from "../Skeletons";
import { twMerge } from "tailwind-merge";

export default function Tickets({ name, className, tickets }) {
  return (
    <div
      className={twMerge(
        "flex flex-wrap items-center justify-center gap-4",
        className
      )}
    >
      {tickets ? (
        tickets.length === 0 ? (
          <p>
            You haven&apos;t booked any tickets yet.{" "}
            <Link className="font-bold text-accent underline" to="/">
              Go book some ticket
            </Link>
          </p>
        ) : (
          tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              movieTitle={ticket.seat.movie.title}
              name={name}
              seat={ticket.seat.number}
            />
          ))
        )
      ) : (
        Array(3)
          .fill()
          .map((_, i) => <TicketSkeleton key={i} />)
      )}
    </div>
  );
}

Tickets.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  tickets: PropTypes.array,
};
