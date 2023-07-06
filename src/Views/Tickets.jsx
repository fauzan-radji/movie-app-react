import PropTypes from "prop-types";
import Header from "../Components/Header";
import TicketsComponent from "../Components/Tickets";
import { Navigate } from "react-router-dom";

export default function Tickets({ isLoggedIn, token }) {
  if (!isLoggedIn) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <div className="mb-4">
      <Header>My Tickets</Header>

      {/* FIXME: use dynamic User Name instead */}
      <TicketsComponent name="John Doe" token={token} />
    </div>
  );
}

Tickets.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
