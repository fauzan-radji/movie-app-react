import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import { Navigate, useParams } from "react-router-dom";
import Icons from "../Components/Icons";
import SecondaryButton from "../Components/SecondaryButton";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import Header from "../Components/Header";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

export default function TransactionDetail({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/orders/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        setTransaction(data.order);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [transactionId, token]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col">
      <Heading>Transaction Details</Heading>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      {isLoading ? (
        // FIXME: Skeleton screen
        <Header>Loading...</Header>
      ) : (
        <>
          <Icons.CheckBadge className="mx-auto mt-8 aspect-square w-20 text-success-700" />
          <p className="text-center">@{transaction.User.username}</p>
          <h1 className="text-center text-lg font-bold">
            {transaction.Movie.title} (
            {transaction.Movie.releaseDate.match(/\d{4}/g)})
          </h1>
          <div className="my-4 flex flex-col gap-4 rounded-md bg-secondary/50 px-4 py-4 shadow-lg shadow-accent/30">
            <h3 className="text-2xl text-accent">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(transaction.total)}
            </h3>
            <div>
              <p className="text-sm text-text/60">Name</p>
              <p>{transaction.User.name}</p>
            </div>
            <div>
              <p className="text-sm text-text/60">Seats</p>
              <p>
                {transaction.seats.map((seat) => seat.seatNumber).join(", ")}
              </p>
            </div>
            <div>
              <p className="text-sm text-text/60">Transaction date</p>
              <p>
                {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              </p>
            </div>
          </div>
        </>
      )}
      <SecondaryButton>Cancel Order</SecondaryButton>
    </div>
  );
}

TransactionDetail.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
