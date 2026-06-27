import { useState } from "react";
import type { Role } from "../../../types/rol";
import { signInWithPopup} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../../lib/firebase";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/SelectInput";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

interface StepBasicInfoProps {
  role: Role;
  //recibe funcion que cambia rol de usuario (recibe el rol) retorna void
  onRoleChange: (r: Role) => void;
  //recibe funcion al hacer submit, regresa el rol al padre para seguir con los steps
  onNext: (role: Role) => void;
  //recibe funcion al tener ya una cuenta y hace cambio al login, el componente padre AuthShell e squien decide que se hace con esto
  onSwitch: () => void;
}

export function StepBasicInfo({ role, onRoleChange, onNext, onSwitch }: StepBasicInfoProps) {
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
    //evita que el formualrio recargue la pagina 
    e.preventDefault();
    //verificacionde estadod  eboton 
    if (!isValid) return;
    //next form 
    onNext(role);
  };

  //contenido de componente select 
  const ROLES = [
    { value: "tourist" as Role, label: "Tourist" },
    { value: "seller" as Role, label: "Seller" },
  ];

  //iconos de botones / el de apple no sirve porque no podemos pagar 99 dolares, pero lo dejamos porque se ve lindo
  const socialButtons = [
    { icon: <FaGoogle size={18} />, label: "Google", provider: googleProvider },
    { icon: <FaFacebook size={18} />, label: "Facebook", provider: facebookProvider },
    { icon: <FaApple size={18} />, label: "Apple", provider: null },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <h2 className="text-2xl font-bold text-neutral-800 text-center">Sign Up</h2>

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
          //evento que se activa-evento que almacena- elemento input- e.target.value:texto actual
          onChange={(e) => setFirstName(e.target.value)}
          //es obligatorio el campo
          required
        />
        <Input
          placeholder="Last Name*"
          value={lastName}
          //guarda lo que se escribe en el input de lastname 
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
        //verificaciond e boton activo para seguir 
        disabled={!isValid}
      />

      {/* SOCIALS:acceso visual a los botones de autenticacion con facebook y google (firebase abre un popup) */}
      
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs text-neutral-400">or continue with</span>
        <div className="flex gap-3">
         {/* recorre el arreglo de botones que tenemos arriba */}
          {socialButtons.map(({ icon, label, provider }) => (
            <button key={label} 
            type="button" 
            aria-label={label} 
            onClick={(e) => {
              //evita un submit del form
                e.preventDefault();
                //evita que el click cierre el modal 
                e.stopPropagation();
                //si hay provider manda lo de firebase (no tenemos el de apple por eso no hace nada)
                if (provider) {
                  signInWithPopup(auth, provider)
                  //.then recibe usuario 
                    .then((result) => {
                      console.log("User:", result.user);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-0 bg-violet-900 hover:opacity-80 transition-opacity"
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
          className="font-semibold text-violet-500 hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}