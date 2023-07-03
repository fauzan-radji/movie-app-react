import PropTypes from "prop-types";
import Header from "../Components/Header";
import TicketsComponent from "../Components/Tickets";
import { Navigate } from "react-router-dom";

export default function Tickets({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <div className="mb-4">
      <Header>My Tickets</Header>

      <TicketsComponent name="John Doe" />
    </div>
  );
}

Tickets.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
