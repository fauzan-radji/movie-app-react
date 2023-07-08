import { NavLink } from "react-router-dom";
import Icons from "./Icons";
import PropTypes from "prop-types";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="border-b-0 border-t-2 border-secondary bg-background md:bottom-auto md:top-0 md:border-b-2 md:border-t-0">
      <div className="container mx-auto flex h-16 items-center justify-center px-6 sm:px-6 lg:px-8">
        <div className="flex w-full items-baseline justify-between md:justify-center md:gap-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                isActive ? " bg-secondary text-primary" : ""
              }`
            }
          >
            <Icons.Home className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:inline">Home</span>
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                    isActive ? " bg-secondary text-primary" : ""
                  }`
                }
              >
                <Icons.UserCircle className="h-6 w-6 md:h-4 md:w-4" />
                <span className="hidden md:inline">Profile</span>
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                    isActive ? " bg-secondary text-primary" : ""
                  }`
                }
              >
                <Icons.ReceiptPercent className="h-6 w-6 md:h-4 md:w-4" />
                <span className="hidden md:inline">My Orders</span>
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                  isActive ? " bg-secondary text-primary" : ""
                }`
              }
            >
              <Icons.Login className="h-6 w-6 md:h-4 md:w-4" />
              <span className="hidden md:inline">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
