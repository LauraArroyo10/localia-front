
import { useState, useEffect } from "react";
import type { LocalBusiness } from "../types/localBusiness";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";



export function useNearbyBusinesses(limit = 10, page = 1) {
	const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const params = new URLSearchParams({
					limit: limit.toString(),
					page: page.toString(),
				});

				const res = await fetch(
					`${API_URL}/api/search/businesses?${params}`
				);

				const json = await res.json();

				if (!res.ok) {
					throw new Error(json.message ?? "Error al obtener negocios");
				}

				const mapped: LocalBusiness[] = json.data.map((b: any) => ({
					id: b.id,
					name: b.name,
					description: b.description ?? "",
					category: b.category,

					location: b.city ?? "",
					city: b.city ?? "",

					latitude: Number(b.lat),
					longitude: Number(b.lng),

					image: b.image_url ?? "",

					rating: Number(b.avgRating ?? 0),
				}));

				setBusinesses(mapped);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error desconocido");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [limit, page]);

	return { businesses, loading, error };
}