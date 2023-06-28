import Icons from "./Icons";

export default function Navbar() {
  return (
    <nav className="border-b-2 border-b-secondary">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-x-4">
          <a
            href="/"
            className="flex items-center gap-x-2 rounded-md px-3 py-2 font-medium text-text hover:bg-secondary hover:text-accent"
          >
            <Icons.Home className="h-4 w-4" />
            Home
          </a>
          <a
            href="/profile"
            className="flex items-center gap-x-2 rounded-md px-3 py-2 font-medium text-text hover:bg-secondary hover:text-accent"
          >
            <Icons.UserCircle className="h-4 w-4" />
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}
