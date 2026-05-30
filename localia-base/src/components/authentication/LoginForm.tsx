import { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
  onSwitch: () => void;
  onClose: () => void;
}

export function LoginForm({ onSwitch, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login", { email, password });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-violet-500 text-center">Welcome Back</h2>

      <Input
        id="login-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="flex flex-col gap-1 text--violet-500 ">
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

      <Button
        type="submit"
        text="Sign In"
        bgColor="bg-violet-500"
        textColor="text-neutral-0"
        size="w-full"
      />

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs text-violet-700">or continue with</span>
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
              className="w-10 h-10 rounded-full flex items-center 
              justify-center text-white 
              hover:opacity-80 transition-opacity
               bg-violet-900"
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