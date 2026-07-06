import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

/**
 * Ruta raíz que renderiza el layout principal de la aplicación.
 * Incluye Outlet para las rutas hijas y las herramientas de router en desarrollo.
 */
export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
