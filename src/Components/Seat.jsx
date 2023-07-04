import { useState } from "react";
import PropTypes from "prop-types";

export default function Seat({ reserved, onSeatSelected, number }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md ${
        selected ? "bg-primary" : reserved ? "bg-text/80" : "bg-accent/30"
      }`}
      onClick={() => {
        if (reserved) return;

        onSeatSelected(!selected);
        setSelected(!selected);
      }}
    >
      {number}
    </div>
  );
}

Seat.propTypes = {
  number: PropTypes.number.isRequired,
  reserved: PropTypes.bool,
  onSeatSelected: PropTypes.func,
};
