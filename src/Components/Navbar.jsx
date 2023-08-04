import { Icons, NavLink } from "./";

import { useAuth } from "../Context/Auth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="border-b-0 border-t-2 border-complimentary bg-neutral md:bottom-auto md:top-0 md:border-b-2 md:border-t-0">
      <div className="container mx-auto flex h-16 items-center justify-center px-6 sm:px-6 lg:px-8">
        <div className="flex w-full items-baseline justify-between md:justify-center md:gap-x-4">
          <NavLink to="/" icon={Icons.Home}>
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" icon={Icons.UserCircle}>
                Profile
              </NavLink>
              <NavLink to="/transactions" icon={Icons.ReceiptPercent}>
                My Orders
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" icon={Icons.Login}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
