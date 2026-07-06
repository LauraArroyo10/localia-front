import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "./useAuth";

export interface FavoriteBusiness {
	favoriteId: string;
	businessId: string;
	name: string;
	description: string | null;
	category: string;
	type: string;
	image_url: string | null;
	city: string | null;
}

/**
 * Hook para manejar la lista de favoritos del usuario.
 * Provee carga, adición, eliminación y comprobación de favoritos.
 */
export function useFavorites() {
	const { token } = useAuth();

	const [favorites, setFavorites] = useState<FavoriteBusiness[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Carga los negocios favoritos del usuario para mostrarlos en la interfaz.
	 * Se ejecuta cuando cambia el token de sesión.
	 */
	const fetchFavorites = async () => {
		if (!token) {
			setFavorites([]);
			setLoading(false);
			return;
		}

		try {
			setLoading(true);

			const res = await apiFetch("/users/me/favorites");
			const json = await res.json();

			if (!res.ok) {
				throw new Error(json.message ?? "Error al cargar favoritos");
			}

			setFavorites(json.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error desconocido");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFavorites();
	}, [token]);

	/**
	 * Agrega un negocio a favoritos y refresca la lista si la operación fue exitosa.
	 */
	const addFavorite = async (businessId: string) => {
		if (!token) return;

		try {
			const res = await apiFetch(`/users/me/favorites/${businessId}`, {
				method: "POST",
			});

			if (res.ok) {
				fetchFavorites();
			} else {
				const json = await res.json();
				setError(json.message ?? "Error al agregar favorito");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error de red");
		}
	};

	/**
	 * Elimina un favorito y actualiza la lista local si la API responde bien.
	 */
	const removeFavorite = async (businessId: string) => {
		if (!token) return;

		try {
			const res = await apiFetch(`/users/me/favorites/${businessId}`, {
				method: "DELETE",
			});

			if (res.ok) {
				fetchFavorites();
			} else {
				const json = await res.json();
				setError(json.message ?? "Error al quitar favorito");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error de red");
		}
	};

	/**
	 * Comprueba si un negocio ya está en favoritos para mostrar el estado correcto.
	 */
	const isFavorite = (businessId: string) => {
		return favorites.some((fav) => fav.businessId === businessId);
	};

	return {
		favorites,
		loading,
		error,
		isFavorite,
		addFavorite,
		removeFavorite,
	};
}