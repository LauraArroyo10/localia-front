import { create } from "zustand";

const DEFAULT_LAT = 9.9281;
const DEFAULT_LNG = -84.0907;

interface LocationState {
	lat: number | null;
	lng: number | null;
	fetched: boolean;
	fetchLocation: () => void;
}

/**
 * Guarda la ubicación del usuario y reutiliza la última señal cuando ya fue solicitada.
 */
export const useLocationStore = create<LocationState>((set, get) => ({
	lat: null,
	lng: null,
	fetched: false,

	/**
	 * Solicita la ubicación del usuario y usa un fallback si el navegador no la permite.
	 */
	fetchLocation: () => {
		if (get().fetched) return; // ya se pidió antes, no repetir
		set({ fetched: true });

		if (!navigator.geolocation) {
			set({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				set({ lat: position.coords.latitude, lng: position.coords.longitude });
			},
			() => {
				set({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
			},
			{
				enableHighAccuracy: false,
				timeout: 5000, // si tarda más de 5s, usa el fallback
				maximumAge: 10 * 60 * 1000, // reutiliza ubicación de hasta 10 min
			},
		);
	},
}));
