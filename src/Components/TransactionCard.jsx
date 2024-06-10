import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatter";

export default function TransactionCard({ transaction }) {
  return (
    <Link
      to={`/transactions/${transaction.id}`}
      className="flex items-start justify-between rounded-md bg-complimentary/50 px-4 py-2 text-complimentaryContrast"
    >
      <div className="flex flex-col ">
        <h4 className="font-bold">{transaction.tickets[0].seat.movie.title}</h4>
        <span className="flex gap-1 text-xs font-semibold">
          <span>Seats:</span>
          {transaction.tickets.map((ticket) => (
            <span
              key={ticket.seat.id}
              className={`${
                ticket.isCancelled
                  ? "bg-danger-300 text-danger-800"
                  : "bg-success-300 text-success-900"
              } rounded px-1`}
            >
              {ticket.seat.number}
            </span>
          ))}
        </span>
        <span className="text-xs text-complimentaryContrast/70">
          {formatDate(transaction.createdAt)}
        </span>
      </div>
      {transaction.tickets.every((ticket) => ticket.isCancelled) && (
        <span className="rounded bg-danger-300 px-1 text-xs font-semibold text-danger-700">
          Canceled
        </span>
      )}
    </Link>
  );
}

TransactionCard.propTypes = {
  transaction: PropTypes.object.isRequired,
};
