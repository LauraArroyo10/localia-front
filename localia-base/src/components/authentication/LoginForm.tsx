import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { auth, facebookProvider, googleProvider } from "../../lib/firebase";
import Button from "../ui/Button";
import Input from "../ui/Input";

import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner";


interface LoginFormProps {
	onSwitch: () => void;
	onClose: () => void;
}

export function LoginForm({ onSwitch, onClose }: LoginFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();
const navigate = useNavigate();

	//se ejecuta al hacer sign in
	const handleSubmit = async (e: React.FormEvent) => {
		//evita que el form recargue la pagina
		e.preventDefault();
		setIsLoading(true);
		
	try {
			await login({ email, password });
			onClose();
			navigate({ to: "/dashboard" });
		} catch (err) {
			  const message = err instanceof Error ? err.message : "Login failed";
        toast.error(message, { style: { background: "#ab0000", color: "#ffffff" } }); 
    } finally {
        setIsLoading(false);
		}
	};

	const socialButtons = [
		{ icon: <FaGoogle size={18} />, label: "Google", provider: googleProvider },
		{
			icon: <FaFacebook size={18} />,
			label: "Facebook",
			provider: facebookProvider,
		},
		{ icon: <FaApple size={18} />, label: "Apple", provider: null },
	];

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-5 w-full max-w-sm mx-auto"
		>
			<h2 className="text-2xl font-bold text-violet-500 text-center">
				Welcome Back
			</h2>

			<Input
				id="login-email"
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<div className="flex flex-col gap-1">
				<Input
					id="login-password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<div className="flex justify-end">
					<button
						type="button"
						className="text-xs text-neutral-500 hover:text-violet-500 transition-colors"
					>
						Forgot password?
					</button>
				</div>
			</div>

	{/* Error del backend */}
			{error && (
				<p className="text-sm text-red-500 text-center">{error}</p>
			)}

			<Button
				type="submit"
				text={isLoading ? "Signing in..." : "Sign In"}
				bgColor="bg-violet-500"
				textColor="text-neutral-0"
				size="w-full"
				disabled={isLoading}
			/>

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs text-violet-700">or continue with</span>
        <div className="flex gap-3">
          {socialButtons.map(({ icon, label, provider }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("click", label);
                if (provider) {
                  console.log("llamando signInWithPopup...");
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      console.log("User:", result.user);
                      onClose();
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-0 hover:opacity-80 transition-opacity bg-violet-900"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

			<p className="text-sm text-center text-neutral-500">
				Don't have an account?{" "}
				<button
					type="button"
					onClick={onSwitch}
					className="font-semibold hover:underline text-violet-500"
				>
					Sign Up
				</button>
			</p>
		</form>
	);
}
