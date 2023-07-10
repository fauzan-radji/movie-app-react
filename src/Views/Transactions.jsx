import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import Heading from "../Components/Heading";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

const dateFormat = new Intl.DateTimeFormat("id-ID", { dateStyle: "full" })
  .format;

export default function Transactions({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK)
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });

        const newOrders = data.data.map((order) => ({
          ...order,
          seats: order.ticket.map((ticket) => ticket.Seats.seatNumber),
          isCanceled: order.ticket.every((ticket) => ticket.isCancel),
        }));
        setOrders(newOrders);
        setIsLoading(false);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }, [token]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <div className="flex flex-col">
      <Heading>My Orders</Heading>

      <AlertContainer className="mt-4" alerts={alerts} dispatch={dispatch} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse flex-col gap-1 rounded-md bg-secondary px-4 py-2"
                >
                  <span className="h-5 w-2/3 rounded bg-accent/20"></span>
                  <span className="h-4 w-1/4 rounded bg-accent/20"></span>
                  <span className="h-3 w-28 rounded bg-accent/20"></span>
                </div>
              ))
          : orders.map((order, index) => (
              <Link
                to={`/transactions/${order.id}`}
                key={index}
                className="flex flex-col rounded-md bg-secondary px-4 py-2"
              >
                <h4 className="font-bold">{order.Movie.title}</h4>
                {order.isCanceled ? (
                  <span className="text-xs font-bold text-danger-700">
                    Canceled
                  </span>
                ) : (
                  <span className="text-xs font-bold text-accent">
                    Seats: {order.seats.join(", ")}
                  </span>
                )}
                <span className="text-xs text-text/70">
                  {dateFormat(order.date)}
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
}

Transactions.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
