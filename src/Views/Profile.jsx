import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreditCard from "../Components/CreditCard";
import Header from "../Components/Header";
import Ticket from "../Components/Ticket";
import Icons from "../Components/Icons";

export default function Profile({ isLoggedIn, setToken }) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="flex flex-col pb-4">
      <div className="relative mt-4 flex h-8 items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center rounded-md bg-secondary px-2 py-1 text-text"
        >
          <Icons.ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-center font-bold">My Profile</h2>
        <button
          className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center rounded-md border border-primary px-2 py-1 text-primary"
          onClick={() => setToken("")}
        >
          <Icons.Login className="h-4 w-4" />
        </button>
      </div>

      <Header className="pb-0">John Doe</Header>
      <p className="text-center text-text/50">@johndoe</p>

      <CreditCard balance={50000} email="johndoe@gmail.com" />

      <h3 className="mt-8 text-lg font-bold">My Tickets</h3>
      <hr className="border-b border-accent/50" />
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <Ticket movie="Thor: Ragnarok" name="John Doe" seat="25" />
        <Ticket movie="Thor: Ragnarok" name="John Doe" seat="25" />
        <Ticket movie="Thor: Ragnarok" name="John Doe" seat="25" />
      </div>
    </div>
  );
}

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
};
