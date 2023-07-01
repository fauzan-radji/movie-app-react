import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function PrimaryButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex justify-center gap-2 rounded-md bg-primary px-4 py-2 text-center text-background",
        className
      )}
    >
      {children}
    </button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
