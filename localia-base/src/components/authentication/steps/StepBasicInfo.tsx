import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { auth, facebookProvider, googleProvider } from "../../../lib/firebase";
import type { Role } from "../../../types/rol";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/SelectInput";
import { toast } from "sonner";

interface StepBasicInfoProps {
	role: Role;
	onRoleChange: (r: Role) => void;
	
	onNext: (
		selectedRole: Role,
		data: { name: string; email: string; password: string },
	) => Promise<void>;
	onSwitch: () => void;
}

export function StepBasicInfo({
	role,
	onRoleChange,
	onNext,
	onSwitch,
}: StepBasicInfoProps) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
const [error,setError]=useState<string | null>(null);
const [submitting,setSubmitting]=useState(false);
	const isValid =
		firstName.trim() &&
		lastName.trim() &&
		email.trim() &&
		password.trim() &&
		role;

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);

    const name = `${firstName.trim()} ${lastName.trim()}`;

    try {
        await onNext(role, { name, email, password });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Ocurrió un error al registrarse";
       toast.error(message, { style: { background: "#ab0000", color: "#ffffff" } }); 
    } finally {
        setSubmitting(false);
    }
};

	const ROLES = [
		{ value: "tourist" as Role, label: "Tourist" },
		{ value: "seller" as Role, label: "Seller" },
	];

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
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 w-full">
			<h2 className="text-2xl font-bold text-neutral-800 text-center">
				Sign Up
			</h2>

			<Select
				value={role}
				onChange={(value) => onRoleChange(value as Role)}
				placeholder="I am a..."
				options={ROLES}
			/>

			<div className="flex gap-3">
				<Input
					placeholder="First Name*"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<Input
					placeholder="Last Name*"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</div>

			<Input
				type="email"
				placeholder="Email*"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<Input
				type="password"
				placeholder="Password*"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button
    type="submit"
    text={submitting ? "Signing up..." : "Sign up"}
    bgColor="bg-violet-500"
    textColor="text-neutral-0"
    size="w-full"
    disabled={!isValid || submitting}
/>

			<div className="flex flex-col items-center gap-3">
				<span className="text-xs text-neutral-400">or continue with</span>
				<div className="flex gap-3">
					{socialButtons.map(({ icon, label, provider }) => (
						<button
							key={label}
							type="button"
							aria-label={label}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								if (provider) {
									signInWithPopup(auth, provider)
										.then((result) => console.log("User:", result.user))
										.catch((error) => console.error("Error:", error));
								}
							}}
							className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-violet-900 hover:opacity-80 transition-opacity"
						>
							{icon}
						</button>
					))}
				</div>
			</div>

			<p className="text-sm text-center text-neutral-500">
				Already have an account?{" "}
				<button
					type="button"
					onClick={onSwitch}
					className="font-semibold text-violet-500 hover:underline"
				>
					Sign In
				</button>
			</p>
		</form>
	);
}
