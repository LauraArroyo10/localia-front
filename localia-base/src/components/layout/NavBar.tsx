import Logo from '../../assets/brand/logo.svg?react'


export interface NavBarProps {}

function NavBar() {
  return (
    <nav className="bg-bg border-b border-violet-700 flex items-center justify-between h-13  max-w-300 mx-auto ">
      {/* Logo */}
      
      <div className="flex items-center gap-2">
        <Logo className="w-30 h-30  " />
        
      </div>

      {/* Links */}
      <div className="flex items-center gap-1 ">
        <a
          href="/"
          className="text-sm text-violet-700 px-4 py-1.5 hover:bg-violet-50 rounded-3xl"
        >
          Home
        </a>
        <a
          href="/signin"
          className="text-sm text-violet-700 px-4 py-1.5 hover:bg-violet-50 rounded-3xl"
        >
          Sign In
        </a>
        <a
          href="/signup"

                className="text-sm font-medium text-violet-700 border border-violet-700 px-4 py-1.5 rounded-3xl hover:bg-violet-50"
        >
          Sign Up
        </a>


    
      </div>
    </nav>
  );
}

export default NavBar;
