import { Link, useNavigate } from "@tanstack/react-router";
import Logo from "../../assets/brand/logo.svg?react";
import { useAuth } from "../../hooks/useAuth";
import { useBusinessProfile } from "../../hooks/useBusinessProfile";

interface NavBarProps {
	onLoginClick?: () => void;
	onRegisterClick?: () => void;
}

function NavBar({ onLoginClick, onRegisterClick }: NavBarProps) {
	const { user, logout } = useAuth();
	const { profileData } = useBusinessProfile();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate({ to: "/" });
	};

	return (
		<nav className="sticky top-0 z-50 bg-bg border-violet-700 w-full">
			<div className="max-w-[1150px] mx-auto flex items-center justify-between h-13">
				<div className="flex items-center gap-2">
					<Logo className="w-30 h-30" />
				</div>

				<div className="flex items-center gap-1">
					<Link
						to="/"
						className="text-sm text-violet-700 px-4 py-1.5 hover:bg-violet-50 rounded-3xl"
					>
						Home
					</Link>

					{user ? (
						<>
							<Link
								to="/dashboard"
								className="text-sm text-violet-700 px-4 py-1.5 hover:bg-violet-50 rounded-3xl"
							>
								{profileData?.businessName || user?.name?.split(" ")[0]}
							</Link>

							<button
								onClick={handleLogout}
								className="text-sm font-medium text-violet-700 border border-violet-700 px-4 py-1.5 rounded-3xl hover:bg-violet-50"
							>
								Sign Out
							</button>
						</>
					) : (
						<>
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
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
