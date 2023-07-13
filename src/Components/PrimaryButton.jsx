import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

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
      className={twMerge("text-accentContrast bg-accent", className)}
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
