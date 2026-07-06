import { useEffect, useState } from "react";
import { LocaliaPanel } from "../layout/Panel";
import { LoginForm } from "./LoginForm";
import { RegisterWizard } from "./Registerwizard";

/**
 * Define las vistas disponibles del modal de autenticación.
 */
type AuthView = "login" | "register";

interface AuthModalProps {
	/**
	 * Controla si el modal debe mostrarse o mantenerse oculto.
	 */
	show: boolean;
	/**
	 * Cierra el modal cuando el usuario cancela la acción.
	 */
	onClose: () => void;
	/**
	 * Indica qué vista debe abrirse primero al mostrar el modal.
	 */
	initialView?: AuthView;
}

/**
 * Modal de autenticación que alterna entre login y registro.
 * Incluye el shell de diseño y delega la vista a los componentes de formulario.
 */
export function AuthModal({
	show,
	onClose,
	initialView = "login",
}: AuthModalProps) {
	/**
	 * Mantiene la vista activa del modal para alternar entre login y registro.
	 */
	const [view, setView] = useState<AuthView>(initialView);

	/**
	 * Reinicia la vista cuando el modal vuelve a abrirse para no retener el paso anterior.
	 */
	useEffect(() => {
		if (show) setView(initialView);
	}, [show, initialView]);

	/**
	 * No renderiza el modal cuando el estado de visibilidad es falso.
	 */
	if (!show) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			onClick={() => {
				console.log("fondo clicked");
				onClose();
			}}
		>
			<div
				className="flex w-full max-w-4xl rounded-4xl bg-neutral-0 mx-4 p-3"
				onClick={(e) => e.stopPropagation()}
			>
				{/* espacio de la izqueirda que muestra informacion */}
				<LocaliaPanel />

				<div className="flex-1 flex flex-col justify-center px-10 py-10 relative">
					<button
						onClick={onClose}
						className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
					>
						✕
					</button>

					<div
						className="h-120 flex flex-col justify-center overflow-y-auto"
						onClick={(e) => {
							console.log("inner div clicked");
							e.stopPropagation();
						}}
					>
						{view === "login" ? (
							<LoginForm
								onSwitch={() => setView("register")}
								onClose={onClose}
							/>
						) : (
							<RegisterWizard
								onClose={onClose}
								onSwitch={() => setView("login")}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
