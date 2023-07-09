import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreditCard from "../Components/CreditCard";
import CreditCardSkeleton from "../Skeleton/CreditCard";
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

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-start md:gap-12">
        <div className="flex flex-col gap-4 md:sticky">
          <div className="flex flex-col gap-1">
            {isLoading ? (
              <>
                <span className="mx-auto h-7 w-2/3 animate-pulse rounded bg-accent/20"></span>
                <span className="mx-auto h-5 w-32 animate-pulse rounded bg-accent/20"></span>
              </>
            ) : (
              <>
                <Header className="py-0">{user.name}</Header>
                <p className="text-center text-text/50">@{user.username}</p>
              </>
            )}
          </div>
          {isLoading ? (
            <CreditCardSkeleton />
          ) : (
            <CreditCard balance={user.balance.balance} email={user.email} />
          )}
          <div className="mx-auto flex w-full max-w-lg gap-4">
            <Link
              to="/profile/topup"
              className={`flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-2 py-3 text-background ${
                isLoading && "pointer-events-none opacity-50"
              }`}
            >
              <Icons.TopUp className="h-6 w-6" /> Top Up
            </Link>
            <Link
              to="/profile/withdraw"
              className={`flex flex-1 items-center justify-center gap-2 rounded-md border border-primary bg-secondary px-2 py-3 text-primary ${
                isLoading && "pointer-events-none opacity-50"
              }`}
            >
              <Icons.Withdraw className="h-6 w-6" /> Withdraw
            </Link>
          </div>
        </div>

        <div className="md:max-h-full">
          {!isLoading && <Tickets name={user.name} token={token} />}
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
