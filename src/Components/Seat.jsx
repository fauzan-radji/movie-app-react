import { useState } from "react";
import PropTypes from "prop-types";

export default function Seat({ reserved, onSeatSelected }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`h-8 w-8 rounded-md ${
        selected ? "bg-primary" : reserved ? "bg-text/80" : "bg-accent/30"
      }`}
      onClick={() => {
        if (reserved) return;

        onSeatSelected(!selected);
        setSelected(!selected);
      }}
    ></div>
  );
}

Seat.propTypes = {
  reserved: PropTypes.bool,
  onSeatSelected: PropTypes.func,
};
