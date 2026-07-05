// // src/hooks/useNearbyBusinesses.ts
// import { useState, useEffect } from "react";
// import type { LocalBusiness } from "../types/localBusiness";

// const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// export function useNearbyBusinesses(
// 	lat: number | null,
// 	lng: number | null,
// 	limit = 10,
// 	page = 1,
// ) {
// 	const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
// 	const [hasMore, setHasMore] = useState(false);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		if (lat === null || lng === null) {
// 			setLoading(false);
// 			return;
// 		}

// 		const fetchData = async () => {
// 			try {
// 				setLoading(true);

// 				const params = new URLSearchParams({
// 					lat: lat.toString(),
// 					lng: lng.toString(),
// 					limit: limit.toString(),
// 					page: page.toString(),
// 				});

// 				const res = await fetch(`${API_URL}/api/search/nearby?${params}`);
// 				const json = await res.json();

// 				if (!res.ok) {
// 					throw new Error(json.message ?? "Error al obtener negocios cercanos");
// 				}

// 				const mapped: LocalBusiness[] = json.data.map((b: any) => ({
// 					id: b.id,
// 					name: b.name,
// 					description: b.description ?? "",
// 					category: b.category,
// 					location: b.city ?? "",
// 					city: b.city ?? "",
// 					latitude: Number(b.lat),
// 					longitude: Number(b.lng),
// 					image_url: !b.image_url
// 						? null
// 						: b.image_url.startsWith("http")
// 							? b.image_url
// 							: `${API_URL}${b.image_url}`,
// 					rating: Number(b.avgRating ?? 0),
// 				}));

// 				setBusinesses(mapped);
// 				setHasMore(json.meta.hasMore ?? false);
// 			} catch (err) {
// 				setError(err instanceof Error ? err.message : "Error desconocido");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, [lat, lng, limit, page]);

// 	return { businesses, hasMore, loading, error };
// }

// src/hooks/useResults.ts
import { useEffect, useState } from "react";
import type { LocalBusiness } from "../types/localBusiness";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function useNearbyBusinesses(
	lat: number | null,
	lng: number | null,
	limit = 10,
	page = 1,
	category?: string,
) {
	const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (lat === null || lng === null) {
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);

				const params = new URLSearchParams({
					lat: lat.toString(),
					lng: lng.toString(),
					limit: limit.toString(),
					page: page.toString(),
				});

				if (category) {
					params.set("category", category);
				}

				const res = await fetch(`${API_URL}/api/search/nearby?${params}`);
				const json = await res.json();

				if (!res.ok) {
					throw new Error(json.message ?? "Error al obtener negocios cercanos");
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
					image_url: !b.image_url
						? null
						: b.image_url.startsWith("http")
							? b.image_url
							: `${API_URL}${b.image_url}`,
					rating: Number(b.avgRating ?? 0),
				}));

				setBusinesses(mapped);
				setHasMore(json.meta.hasMore ?? false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error desconocido");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [lat, lng, limit, page, category]);

	return { businesses, hasMore, loading, error };
}
