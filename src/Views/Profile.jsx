import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreditCard from "../Components/CreditCard";
import CreditCardSkeleton from "../Skeleton/CreditCard";
import Header from "../Components/Header";
import HeaderSkeleton from "../Skeleton/Header";
import Icons from "../Components/Icons";
import Tickets from "../Components/Tickets";
import Heading from "../Components/Heading";
import { useEffect, useReducer } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";
import useFetch from "../hooks/useFetch";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Profile({ isLoggedIn, token, setToken }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const {
    data: user,
    error,
    isLoading,
  } = useFetch(`${API_ENDPOINT}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!error) return;
    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error.message });
  }, [error]);

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;

  return (
    <div className="flex flex-col pb-4">
      <Heading
        rightButton={
          <button
            className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center rounded-md border border-danger-600 px-2 py-1 text-danger-600"
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
                <HeaderSkeleton />
                <span className="mx-auto h-5 w-32 animate-pulse rounded bg-complimentaryDark/30"></span>
              </>
            ) : (
              <>
                <Header className="py-0">{user.name}</Header>
                <p className="text-center text-neutralContrast/50">
                  @{user.username} | {user.age} y.o
                </p>
              </>
            )}
          </div>
          {isLoading ? (
            <CreditCardSkeleton />
          ) : (
            <CreditCard balance={user.balance} email={user.email} />
          )}
          <div className="mx-auto flex w-full max-w-lg gap-4">
            <Link
              to="/profile/topup"
              className={`flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-2 py-3 text-accentContrast ${
                isLoading && "pointer-events-none opacity-50"
              }`}
            >
              <Icons.TopUp className="h-6 w-6" /> Top Up
            </Link>
            <Link
              to="/profile/withdraw"
              className={`flex flex-1 items-center justify-center gap-2 rounded-md bg-complimentary px-2 py-3 text-complimentaryContrast ${
                isLoading && "pointer-events-none opacity-50"
              }`}
            >
              <Icons.Withdraw className="h-6 w-6" /> Withdraw
            </Link>
          </div>
        </div>

        <div className="md:max-h-full">
          <Tickets
            tickets={user?.Tickets.filter((ticket) => !ticket.isCancel)}
            name={user?.name || ""}
            token={token}
          />
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
