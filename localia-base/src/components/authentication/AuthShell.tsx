import { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterWizard } from "./Registerwizard";
import { LocaliaPanel } from "../layout/Panel";

//type para usar en mostrar el modulo para registrasre o muestra el de ingreso
type AuthView = "login" | "register";

interface AuthModalProps {
  //se rendriza o no 
  show: boolean;
  //cerrar modal 
  onClose: () => void;
  //que se va aver primero? el deefault es el login pero esto cambia 
  initialView?: AuthView;
}

export function AuthModal({ show, onClose, initialView = "login" }: AuthModalProps) {
  //el estado solo p uede ser register o login , setView login o sertView register
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    // si semuestra , se pone la vista inicial 
    if (show) setView(initialView);
  }, 
  //array de dependencias: ejecuta el effect cada que cambie show o initial view
  [show, initialView]);


  //si no se muestra, no regreasa nada
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => { console.log("fondo clicked"); onClose(); }}
    >
      <div
      // e.stopPropagation(): para evitar clicks qu eno queramos en las diferentes capas del ui
        className="flex w-full max-w-4xl rounded-4xl bg-white mx-4 p-3"
        onClick={(e) => e.stopPropagation()}
      >
       {/* espacio de la izqueirda que muestra informacion */}
        <LocaliaPanel />

        <div className="flex-1 flex flex-col justify-center px-10 py-10 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>

          <div
            className="h-120 flex flex-col justify-center overflow-y-auto"
            onClick={(e) => { console.log("inner div clicked"); e.stopPropagation(); }}
          >
            {view === "login" ? (
              <LoginForm onSwitch={() => setView("register")} onClose={onClose} />
            ) : (
              <RegisterWizard onClose={onClose} onSwitch={() => setView("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}