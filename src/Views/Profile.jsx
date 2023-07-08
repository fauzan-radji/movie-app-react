import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreditCard from "../Components/CreditCard";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import Tickets from "../Components/Tickets";
import Heading from "../Components/Heading";
import { useEffect, useReducer, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_OK = 200;

export default function Profile({ isLoggedIn, token, setToken }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        setUser(data.data);
        setIsLoading(false);
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="flex flex-col pb-4">
      <Heading
        rightButton={
          <button
            className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center rounded-md border border-primary px-2 py-1 text-primary"
            onClick={() => setToken("")}
          >
            <Icons.Logout className="h-4 w-4" />
          </button>
        }
      >
        My Profile
      </Heading>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      {isLoading ? (
        // TODO: display skeleton screen
        <Header>Loading ...</Header>
      ) : (
        <>
          <Header className="py-0">{user.name}</Header>
          <p className="text-center text-text/50">@{user.username}</p>

          <CreditCard
            balance={user.balance.balance}
            email="johndoe@gmail.com"
          />

          <div className="mt-4 flex w-full gap-4">
            <Link
              to="/profile/topup"
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-2 py-3 text-background"
            >
              <Icons.TopUp className="h-6 w-6" /> Top Up
            </Link>
            <Link
              to="/profile/withdraw"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-primary bg-secondary px-2 py-3 text-primary"
            >
              <Icons.Withdraw className="h-6 w-6" /> Withdraw
            </Link>
          </div>

          <h3 className="mt-8 text-center text-lg font-bold">My Tickets</h3>
          <hr className="border-b border-accent/50" />

          <Tickets name={user.name} token={token} />
        </>
      )}
    </div>
  );
}

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
