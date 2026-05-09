import { NavbarMenu } from "../mockData/data";

export interface NavBarProps {}

function NavBar() {
  return (
    <nav className="bg-bg border-b border-violet-700 flex items-center justify-between h-13  max-w-277 mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="src/assets/brand/logo.svg"
          alt="Localia"
          className="w-30 h-30"
        />
      </div>


      {/* Links */}
      <div className="flex items-center gap-1">
        <a
          href="/"
          className="text-sm text-violet-700 px-4 py-1.5  "
        >
          Home
        </a>
        <a
          href="/signin"
          className="text-sm text-violet-700 px-4 py-1.5 "
        >
          Sign In
        </a>
        <a
          href="/signup"

                className="text-sm font-medium text-neutral-0 bg-violet-700 px-4 py-1.5 rounded-3xl "
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
