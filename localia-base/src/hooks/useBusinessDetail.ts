// src/hooks/useBusinessDetail.ts
import { useEffect, useState } from "react";
import { API_URL, apiFetch } from "../lib/api";

export interface BusinessDetail {
	id: string;
	owner_id: string;
	name: string;
	description: string | null;
	category: string;
	type: string;
	phone: string | null;
	image_url: string | null;
	address: string | null;
	city: string | null;
	lat: string | null;
	lng: string | null;
	avgRating: number;
	totalReviews: number;
}

export function useBusinessDetail(businessId: string | undefined) {
	const [business, setBusiness] = useState<BusinessDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!businessId) {
			setLoading(false);
			return;
		}

		const fetchBusiness = async () => {
			try {
				setLoading(true);
				setError(null);

				const res = await apiFetch(`/api/businesses/${businessId}`);
				const json = await res.json();

				if (!res.ok) {
					throw new Error(json.message ?? "No se pudo obtener el negocio");
				}

				const raw = json.data.business;
				const imageUrl = !raw.image_url
					? null
					: raw.image_url.startsWith("http")
						? raw.image_url
						: `${API_URL}${raw.image_url}`;

				setBusiness({
					...raw,
					image_url: imageUrl,
					avgRating: Number(json.data.avgRating ?? 0),
					totalReviews: Number(json.data.totalReviews ?? 0),
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error desconocido");
			} finally {
				setLoading(false);
			}
		};

		fetchBusiness();
	}, [businessId]);

	return { business, loading, error };
}