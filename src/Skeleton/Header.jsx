import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Header({ className }) {
  return (
    <span
      className={twMerge(
        `mx-auto h-7 w-2/3 animate-pulse rounded bg-complimentaryDark/30`,
        className
      )}
    ></span>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
