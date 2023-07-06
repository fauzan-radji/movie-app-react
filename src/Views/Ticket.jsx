import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import Header from "../Components/Header";
import { Navigate, useParams } from "react-router-dom";
import TicketComponent from "../Components/Ticket";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import SecondaryButton from "../Components/SecondaryButton";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;
const HTTP_CREATED = 201;

export default function Ticket({ isLoggedIn }) {
  const { ticketId } = useParams();
  const [alerts, dispatch] = useReducer(alertReducer, []);
  // const [ticket, setTicket] = useState({});
  // const [isCancelled, setIsCancelled] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch(`${API_ENDPOINT}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.statusCode !== HTTP_OK) {
    //       dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
    //       return;
    //     }
    //     setTicket();
    //     setIsLoading(false);
    //   })
    //   .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }, [ticketId]);

  function handleClick() {
    // fetch(`${API_ENDPOINT}/orders/cancel/${transaction.Movie.id}`, {
    // method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
    // body: JSON.stringify({ ticketsSeatNumber: transaction.seats }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.statusCode !== HTTP_CREATED) {
    //       if (Array.isArray(data.message)) {
    //         data.message.forEach((message) => {
    //           dispatch({ type: ACTIONS.ERROR_PUSH, payload: message });
    //         });
    //         return;
    //       }
    //       dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
    //       return;
    //     }
    //     setIsCancelled(true);
    //   })
    //   .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Heading>Ticket details</Heading>

      <AlertContainer className="my-0" alerts={alerts} dispatch={dispatch} />

      <Header className="py-0">Avatar: The Way of Water (2023)</Header>

      <TicketComponent
        className="self-center"
        movieTitle="Avatar: The Way of Water"
        id={ticketId}
        name="John Doe"
        seat="14"
      />

      <div className="flex flex-col gap-4 rounded-md bg-secondary/50 px-4 py-4 shadow-lg shadow-accent/30">
        <div>
          <p className="text-sm text-text/60">Name</p>
          <p>John Doe</p>
        </div>
        <div>
          <p className="text-sm text-text/60">Seat</p>
          <p>14</p>
        </div>
        <div>
          <p className="text-sm text-text/60">Transaction date</p>
          <p>Rabu 21 Juli 2021</p>
        </div>
        <p className="font-bold text-danger-700">Canceled</p>
      </div>

      <SecondaryButton onClick={handleClick}>Cancel Ticket</SecondaryButton>
    </div>
  );
}

Ticket.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
