// src/lib/api.ts
import { useAuth } from "../hooks/useAuth";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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

