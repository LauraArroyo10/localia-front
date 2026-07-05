import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface BusinessLocation {
	address: string | null;
	city: string | null;
	lat: string | null;
	lng: string | null;
	location: string;
}

export function useBusinessLocation() {
	const { token, user } = useAuth();

	const [location, setLocation] = useState<BusinessLocation | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!token || user?.role !== "seller") {
			setLoading(false);
			return;
		}

		const fetchLocation = async () => {
			try {
				const res = await fetch(`${API_URL}/api/businesses/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

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
