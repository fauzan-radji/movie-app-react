import { NavLink as Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavLink({ to, icon: Icon, children }) {
  return (
    <Link
      to={to}
      className={({ isActive }) =>
        `flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium max-md:flex-col md:flex-none md:py-2 ${
          isActive
            ? "bg-complimentary text-complimentaryContrast"
            : "text-neutralContrast hover:bg-complimentary/50 hover:text-complimentaryContrast"
        }`
      }
    >
      {Icon && <Icon className="h-5 w-5 md:h-4 md:w-4" />}
      <span className="max-md:text-xs">{children}</span>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
};
