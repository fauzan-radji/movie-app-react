import { Button } from "./";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function PrimaryButton({
  children,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={twMerge("bg-accent text-accentContrast", className)}
    >
      {children}
    </Button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
