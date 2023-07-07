import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-center disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
