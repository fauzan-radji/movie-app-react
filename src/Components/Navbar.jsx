import { Link } from "react-router-dom";
import Icons from "./Icons";

export default function Navbar() {
  return (
    <nav className="border-b-0 border-t-2 border-secondary bg-background md:bottom-auto md:top-0 md:border-b-2 md:border-t-0">
      <div className="container mx-auto flex h-16 items-center justify-center px-6 sm:px-6 lg:px-8">
        <div className="flex w-full items-baseline justify-between md:justify-center md:gap-x-4">
          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium text-text hover:bg-secondary hover:text-accent md:flex-none"
          >
            <Icons.Home className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium text-text hover:bg-secondary hover:text-accent md:flex-none"
          >
            <Icons.UserCircle className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:inline">Profile</span>
          </Link>
          <Link
            to="/login"
            className="flex flex-1 items-center justify-center gap-x-2 rounded-md px-3 py-2 font-medium text-text hover:bg-secondary hover:text-accent md:flex-none"
          >
            <Icons.Login className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:inline">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
