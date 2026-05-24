import { useState } from "react";
import Button from '../ui/Button';
import Input from '../ui/Input';
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { type Role } from '../Registerwizard';

interface StepBasicInfoProps {
  role: Role;
  onRoleChange: (r: Role) => void;
  onNext: (role: Role) => void;
  onSwitch: () => void;
}

export function StepBasicInfo({ role, onRoleChange, onNext, onSwitch }: StepBasicInfoProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    firstName.trim() && lastName.trim() && phone.trim() && email.trim() && password.trim() && role;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onNext(role);
  };

  const ROLES = [
    { id: "tourist" as Role, label: "Tourist", sub: "Explore local experiences" },
    { id: "seller" as Role, label: "Seller", sub: "Showcase your business" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-neutral-800 text-center">Sign Up</h2>

      {/* Selector de rol estilo categoría */}
      <select
  value={role}
  onChange={(e) => onRoleChange(e.target.value as Role)}
  required
  className="w-full h-[43.79px] rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 px-5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none"
>
  <option value="" disabled>I am a...*</option>
  <option value="tourist">Tourist — Explore local experiences</option>
  <option value="seller">Seller — Showcase your business</option>
</select>

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
        type="tel"
        placeholder="Phone Number*"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

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
        text="Sign up"
        bgColor="bg-violet-500"
        textColor="text-neutral-0"
        size="w-full"
        disabled={!isValid}
      />

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs text-neutral-400">or continue with</span>
        <div className="flex gap-3">
          {[
            { icon: <FaGoogle size={18} />, label: "Google" },
            { icon: <FaFacebook size={18} />, label: "Facebook" },
            { icon: <FaApple size={18} />, label: "Apple" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity bg-violet-900"
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
          className="font-semibold hover:underline text-violet-500"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}