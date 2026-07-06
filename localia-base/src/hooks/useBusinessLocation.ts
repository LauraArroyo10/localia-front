import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "./useAuth";

interface BusinessLocation {
	address: string | null;
	city: string | null;
	lat: string | null;
	lng: string | null;
	location: string;
}

/**
 * Hook que obtiene la ubicación del negocio asociado al usuario vendedor.
 * Se usa desde vistas que muestran dirección o mapas cuando hay seller logueado.
 */
export function useBusinessLocation() {
	const { token, user } = useAuth();

	const [location, setLocation] = useState<BusinessLocation | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		/**
		 * Solo consulta la ubicación cuando el usuario autenticado es vendedor.
		 */
		if (!token || user?.role !== "seller") {
			setLoading(false);
			return;
		}

		/**
		 * Busca en la API la ubicación del negocio del vendedor actual.
		 */
		const fetchLocation = async () => {
			try {
				const res = await apiFetch("/api/businesses/me");
				const json = await res.json();

				if (!res.ok) {
					throw new Error(json.message);
				}

				setLocation(json.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchLocation();
	}, [token, user]);

	return {
		location,
		loading,
		error,
	};
}