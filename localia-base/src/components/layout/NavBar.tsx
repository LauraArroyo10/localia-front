
import Logo from '../../assets/brand/logo.svg?react'

interface NavBarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

function NavBar({ onLoginClick, onRegisterClick }: NavBarProps) {
  return (
    <nav className="bg-bg border-b border-violet-700 flex items-center justify-between h-13 max-w-300 mx-auto">
      <div className="flex items-center gap-2">
        <Logo className="w-30 h-30" />
      </div>

      <div className="flex items-center gap-1">
        <a href="/" className="text-sm text-violet-700 px-4 py-1.5 hover:bg-violet-50 rounded-3xl">
          Home
        </a>
        <button
          onClick={onLoginClick}
          className="text-sm text-violet-700 px-4 py-1.5 hover:bg-violet-50 rounded-3xl"
        >
          Sign In
        </button>
        <button
          onClick={onRegisterClick}
          className="text-sm font-medium text-violet-700 border border-violet-700 px-4 py-1.5 rounded-3xl hover:bg-violet-50"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default NavBar;