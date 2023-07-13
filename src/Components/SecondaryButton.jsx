import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

export default function SecondaryButton({
  children,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "bg-complimentary text-complimentaryContrast",
        className
      )}
    >
      {children}
    </Button>
  );
}

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
