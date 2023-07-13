import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const dateFormat = new Intl.DateTimeFormat("id-ID", { dateStyle: "full" })
  .format;

export default function TransactionCard({ transaction }) {
  return (
    <Link
      to={`/transactions/${transaction.id}`}
      className="flex items-start justify-between rounded-md bg-complimentary/50 px-4 py-2 text-complimentaryContrast"
    >
      <div className="flex flex-col ">
        <h4 className="font-bold">{transaction.Movie.title}</h4>
        <span className="flex gap-1 text-xs font-semibold">
          <span>Seats:</span>
          {transaction.ticket.map((ticket) => (
            <span
              key={ticket.Seats.id}
              className={`${
                ticket.isCancel
                  ? "bg-danger-300 text-danger-800"
                  : "bg-success-300 text-success-900"
              } rounded px-1`}
            >
              {ticket.Seats.seatNumber}
            </span>
          ))}
        </span>
        <span className="text-xs text-complimentaryContrast/70">
          {dateFormat(transaction.date)}
        </span>
      </div>
      {transaction.ticket.every((ticket) => ticket.isCancel) && (
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
