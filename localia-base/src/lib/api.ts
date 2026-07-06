import { useAuth } from "../hooks/useAuth";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

/**
 * Wrapper de fetch para la API que inyecta el token de auth en las cabeceras.
 * Facilita llamadas desde los hooks sin repetir la lógica de autorización.
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
	const token = useAuth.getState().token;

	const res = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			...options.headers,
			Authorization: token ? `Bearer ${token}` : "",
		},
	});

	return res;
}

