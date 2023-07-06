import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function SecondaryButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex justify-center gap-2 rounded-md border border-primary bg-secondary px-4 py-2 text-center text-primary",
        className
      )}
    >
      {children}
    </button>
  );
}

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
