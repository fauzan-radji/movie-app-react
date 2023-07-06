import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import Heading from "../Components/Heading";
import Icons from "../Components/Icons";
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

        const newOrders = data.orderHistory.map((order) => ({
          ...order,
          seats: order.seats.map((seat) => seat.seatNumber),
          // FIXME: fix this isCanceled state
          isCanceled:
            order.seats.length === 0 || order.seats.every((seat) => !seat.book),
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

      <div className="my-4 flex flex-col gap-4">
        {isLoading
          ? Array(4)
              .fill()
              .map((_, i) => (
                // FIXME: skeleton screen
                <div
                  key={i}
                  className="flex animate-pulse items-start justify-between rounded-md bg-accent/20 px-4 py-2"
                >
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="rounded bg-accent/20 font-bold">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h4>
                    <span className="rounded bg-accent/20 text-xs">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                </div>
              ))
          : orders.map((order, index) => (
              <div
                key={index}
                className={`flex items-start justify-between rounded-md bg-secondary px-4 py-2`}
              >
                <div className="flex flex-col">
                  <h4 className={`font-bold`}>{order.Movie.title}</h4>
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
                </div>

                <Link to={`/transactions/${order.id}`}>
                  <Icons.ArrowTopRight className="h-5 w-5 text-accent" />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

Transactions.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
