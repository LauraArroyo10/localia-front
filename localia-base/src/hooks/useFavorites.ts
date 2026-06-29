import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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

export function useFavorites() {
	const { token } = useAuth();

	const [favorites, setFavorites] = useState<FavoriteBusiness[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchFavorites = async () => {
		if (!token) {
			setFavorites([]);
			setLoading(false);
			return;
		}

		try {
			setLoading(true);

			const res = await fetch(`${API_URL}/users/me/favorites`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

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

	const addFavorite = async (businessId: string) => {
		if (!token) return;

		const res = await fetch(
			`${API_URL}/users/me/favorites/${businessId}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.ok) {
			fetchFavorites();
		}
	};

	const removeFavorite = async (businessId: string) => {
		if (!token) return;

		const res = await fetch(
			`${API_URL}/users/me/favorites/${businessId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.ok) {
			fetchFavorites();
		}
	};

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