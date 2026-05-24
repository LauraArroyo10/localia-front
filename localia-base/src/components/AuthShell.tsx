import { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterWizard } from "./Registerwizard";
import { LocaliaPanel } from "./Panel";

type AuthView = "login" | "register";

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
  initialView?: AuthView;
}

export function AuthModal({
  show,
  onClose,
  initialView = "login",
}: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    if (show) setView(initialView);
  }, [show, initialView]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-4xl rounded-4xl shadow-2xl bg-white mx-4 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <LocaliaPanel />

        <div className="flex-1 flex flex-col justify-center px-10 py-10 relative">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>

         {/* Altura fija igual al LoginForm, solo el contenido hace scroll */}
<div className="h-120 flex flex-col justify-center overflow-y-auto">
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