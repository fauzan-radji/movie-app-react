import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Header({ children, className }) {
  return (
    <h1 className={twMerge("py-4 text-center text-2xl font-bold", className)}>
      {children}
    </h1>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
