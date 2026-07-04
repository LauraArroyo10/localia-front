// src/hooks/useUserLocation.ts
import { useEffect } from "react";
import { useLocationStore } from "../store/locationStore";

export function useUserLocation() {
	const { lat, lng, fetchLocation } = useLocationStore();

	useEffect(() => {
		fetchLocation();
	}, [fetchLocation]);

	return { lat, lng };
}