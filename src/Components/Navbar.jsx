import { Link, useLocation } from "react-router-dom";
import Icons from "./Icons";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <nav className="border-b-0 border-t-2 border-secondary bg-background md:bottom-auto md:top-0 md:border-b-2 md:border-t-0">
      <div className="container mx-auto flex h-16 items-center justify-center px-6 sm:px-6 lg:px-8">
        <div className="flex w-full items-baseline justify-between md:justify-center md:gap-x-4">
          <Link
            to="/"
            className={`flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
              currentPath === "/" ? " bg-secondary text-primary" : ""
            }`}
          >
            <Icons.Home className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={`flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                  currentPath === "/profile" ? " bg-secondary text-primary" : ""
                }`}
              >
                <Icons.UserCircle className="h-6 w-6 md:h-4 md:w-4" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <Link
                to="/tickets"
                className={`flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                  currentPath === "/tickets" ? " bg-secondary text-primary" : ""
                }`}
              >
                <Icons.Ticket className="h-6 w-6 md:h-4 md:w-4" />
                <span className="hidden md:inline">My Tickets</span>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className={`flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium hover:bg-secondary hover:text-accent md:flex-none${
                currentPath === "/login" ? " bg-secondary text-primary" : ""
              }`}
            >
              <Icons.Login className="h-6 w-6 md:h-4 md:w-4" />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
