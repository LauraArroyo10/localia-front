
import { useState } from "react";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/SelectInput";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { type Role } from "../../authentication/Registerwizard";

interface StepBasicInfoProps {
  role: Role;
  onRoleChange: (r: Role) => void;
  onNext: (role: Role) => void;
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

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    password.trim() &&
    role;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    onNext(role);
  };

  const ROLES = [
    {
      value: "tourist" as Role,
      label: "Tourist",
      sub: "Explore local experiences",
    },

    {
      value: "seller" as Role,
      label: "Seller",
      sub: "Showcase your business",
    },
  ];

  return (

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >

      <h2 className="text-2xl font-bold text-neutral-800 text-center">
        Sign Up
      </h2>

      {/* ROLE SELECT */}
      <Select
        value={role}
        onChange={(value) => onRoleChange(value as Role)}
        placeholder="I am a..."
        options={ROLES}
      />

      {/* NAME INPUTS */}
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

      {/* EMAIL */}
      <Input
        type="email"
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* PASSWORD */}
      <Input
        type="password"
        placeholder="Password*"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* BUTTON */}
      <Button
        type="submit"
        text="Sign up"
        bgColor="bg-violet-500"
        textColor="text-neutral-0"
        size="w-full"
        disabled={!isValid}
      />

      {/* SOCIALS */}
      <div className="flex flex-col items-center gap-3">

        <span className="text-xs text-neutral-400">
          or continue with
        </span>

        <div className="flex gap-3">

          {[
            {
              icon: <FaGoogle size={18} />,
              label: "Google",
            },

            {
              icon: <FaFacebook size={18} />,
              label: "Facebook",
            },

            {
              icon: <FaApple size={18} />,
              label: "Apple",
            },

          ].map(({ icon, label }) => (

            <button
              key={label}
              type="button"
              aria-label={label}
              className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-white
                bg-violet-900
                hover:opacity-80
                transition-opacity
              "
            >
              {icon}
            </button>

          ))}

        </div>

      </div>

      {/* SWITCH */}
      <p className="text-sm text-center text-neutral-500">

        Already have an account?{" "}

        <button
          type="button"
          onClick={onSwitch}
          className="
            font-semibold
            text-violet-500
            hover:underline
          "
        >
          Sign In
        </button>

      </p>

    </form>

  );
}