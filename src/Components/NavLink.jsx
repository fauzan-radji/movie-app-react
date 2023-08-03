import { NavLink as Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className={({ isActive }) =>
        `flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-3 font-medium md:flex-none md:py-2 ${
          isActive
            ? "bg-complimentary text-complimentaryContrast"
            : "text-neutralContrast hover:bg-complimentary/50 hover:text-complimentaryContrast"
        }`
      }
    >
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
