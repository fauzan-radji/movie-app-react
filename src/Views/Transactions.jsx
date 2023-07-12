import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Heading from "../Components/Heading";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import TransactionCard from "../Components/TransactionCard";
import TransactionCardSkeleton from "../Skeleton/TransactionCard";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

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
              .map((_, index) => <TransactionCardSkeleton key={index + 1} />)
          : orders.map((order) => (
              <TransactionCard transaction={order} key={order.id} />
            ))}
      </div>
    </div>
  );
}

Transactions.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
