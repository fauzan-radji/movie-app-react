import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreditCard from "../Components/CreditCard";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import { useFetch } from "usehooks-ts";
import ErrorAlert from "../Components/ErrorAlert";
import Tickets from "../Components/Tickets";
import Heading from "../Components/Heading";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Profile({ isLoggedIn, token, setToken }) {
  const { data: user, error: userError } = useFetch(`${API_ENDPOINT}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { data: balance, error: balanceError } = useFetch(
    `${API_ENDPOINT}/balance`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="flex flex-col pb-4">
      {/* TODO: export into a separate component */}
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

      {userError ? (
        // TODO: display better error feedback
        <ErrorAlert>
          <p>Woops, something went wrong</p>
        </ErrorAlert>
      ) : user ? (
        <>
          <Header className="pb-0">{user.name}</Header>
          <p className="text-center text-text/50">@{user.username}</p>

          {balanceError ? (
            // TODO: display better error feedback
            <ErrorAlert>
              <p>Woops, something went wrong</p>
            </ErrorAlert>
          ) : (
            <CreditCard
              balance={balance ? balance.balance : "Rp 0,00"}
              email="johndoe@gmail.com"
            />
          )}

          <div className="mt-4 flex w-full gap-4">
            <Link
              to="/topup"
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-2 py-3 text-background"
            >
              <Icons.TopUp className="h-6 w-6" /> Top Up
            </Link>
            <Link
              to="/withdraw"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-primary bg-secondary px-2 py-3 text-primary"
            >
              <Icons.Withdraw className="h-6 w-6" /> Withdraw
            </Link>
          </div>

          {/* TODO: fetch all tickets */}
          <h3 className="mt-8 text-lg font-bold">My Tickets</h3>
          <hr className="border-b border-accent/50" />

          <Tickets className="mt-4" name="John Doe" />
        </>
      ) : (
        // TODO: display skeleton screen
        <Header>Loading ...</Header>
      )}
    </div>
  );
}

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
