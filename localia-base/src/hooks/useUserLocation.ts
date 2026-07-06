import { useEffect } from "react";
import { useLocationStore } from "../store/locationStore";

/**
 * Hook que expone la ubicación del usuario desde el store global de Zustand.
 * Se utiliza cuando la app necesita coordenadas para búsquedas o rutas.
 */
export function useUserLocation() {
	const { lat, lng, fetchLocation } = useLocationStore();

	useEffect(() => {
		/**
		 * Solicita la ubicación del usuario una vez cuando el hook se monta.
		 */
		fetchLocation();
	}, [fetchLocation]);

	return { lat, lng };
}
