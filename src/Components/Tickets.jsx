import PropTypes from "prop-types";
import TicketSkeleton from "../Skeleton/Ticket";
import Ticket from "./Ticket";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Tickets({ name, className }) {
  // TODO: fetch from real API
  const [tickets, setTickets] = useState(undefined);

  setTimeout(() => {
    setTickets([
      {
        id: "af066-c5f",
        seatNumber: 1,
        Movie: {
          title: "John Wick: Chapter 4",
        },
      },
      {
        id: "af066-c5g",
        seatNumber: 4,
        Movie: {
          title: "Transformers: Age of Extinction",
        },
      },
      {
        id: "af066-c5h",
        seatNumber: 5,
        Movie: {
          title: "Avengers: Endgame",
        },
      },
    ]);
  }, 1300);

  return (
    <div
      className={twMerge(
        `flex flex-wrap items-center justify-center gap-4`,
        className
      )}
    >
      {tickets
        ? tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              movie={ticket.Movie.title}
              name={name}
              seat={ticket.seatNumber}
            />
          ))
        : Array(3)
            .fill()
            .map((_, i) => <TicketSkeleton key={i} />)}
    </div>
  );
}

Tickets.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
