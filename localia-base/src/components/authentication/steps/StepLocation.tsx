import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

/**
 * Reemplaza los íconos por defecto de Leaflet para que funcionen correctamente con Vite.
 */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

/**
 * Describe la respuesta que devuelve la API de geocodificación de Nominatim.
 */
interface Suggestion {
	display_name: string;
	lat: string;
	lon: string;
}

/**
 * Props del paso de ubicación para el asistente de registro.
 */
interface StepLocationProps {
	/**
	 * Callback que se ejecuta cuando el usuario confirma la ubicación.
	 */
	onFinish: (location: any) => void;
	/**
	 * Callback que permite regresar al paso anterior.
	 */
	onBack: () => void;
}

/**
 * Componente auxiliar que mueve el mapa cuando cambia la ubicación seleccionada.
 * useMap solo funciona dentro de MapContainer, por eso se separa en un componente.
 */
function FlyToLocation({ lat, lon }: { lat: number; lon: number }) {
	const map = useMap();
	useEffect(() => {
		/**
		 * Anima el mapa hacia la nueva ubicación seleccionada.
		 */
		map.flyTo([lat, lon], 15, { duration: 1.2 });
	}, [lat, lon, map]);
	return null;
}

/**
 * Paso de ubicación que busca direcciones y permite elegir un punto en el mapa.
 */
export function StepLocation({ onFinish, onBack }: StepLocationProps) {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [selected, setSelected] = useState<Suggestion | null>(null);
	const [loading, setLoading] = useState(false);

	/**
	 * Busca sugerencias geográficas mientras el usuario escribe y evita consultas innecesarias.
	 */
	useEffect(() => {
		if (query.length < 3 || selected) return setSuggestions([]);

		const timer = setTimeout(async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
					{ headers: { "Accept-Language": "en" } },
				);
				setSuggestions(await res.json());
			} catch {
				setSuggestions([]);
			} finally {
				setLoading(false);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [query, selected]);

	/**
	 * Guarda la ubicación elegida y limpia la lista de sugerencias.
	 */
	/**
	 * Guarda la sugerencia seleccionada y cierra la lista de resultados.
	 */
	const handleSelect = (s: Suggestion) => {
		setSelected(s);
		setQuery(s.display_name);
		setSuggestions([]);
	};

	/**
	 * Convierte la sugerencia seleccionada en coordenadas numéricas para el marcador.
	 */
	const selectedPosition: [number, number] | null = selected
		? [parseFloat(selected.lat), parseFloat(selected.lon)]
		: null;

	return (
		<div className="flex flex-col gap-3 w-full">
			<h2 className="text-xl font-bold text-neutral-800 text-center">
				Where are you at?
			</h2>

			{/* Input de búsqueda */}
			<div className="relative">
				<Input
					placeholder="Search your city or address..."
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setSelected(null);
					}}
					required
				/>

				{/* Spinner */}
				{loading && (
					<span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
						...
					</span>
				)}

				{/* Sugerencias */}
				{suggestions.length > 0 && (
					<ul className="absolute z-10 w-full mt-1 bg-neutral-0 border border-neutral-200 rounded-2xl overflow-hidden">
						{suggestions.map((s, i) => (
							<li
								key={i}
								onClick={() => handleSelect(s)}
								className="px-4 py-2.5 text-sm text-neutral-700 hover:bg-violet-50 hover:text-violet-700 cursor-pointer transition-colors"
							>
								{s.display_name}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Mapa Leaflet */}
			<div className="w-full h-52 rounded-2xl overflow-hidden border border-neutral-200 z-0">
				<MapContainer
					center={[9.7489, -83.7534]}
					zoom={7}
					style={{ width: "100%", height: "100%" }}
					scrollWheelZoom={false}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
					/>

					{/**
				 * Marker que muestra la ubicación seleccionada en el mapa.
				 */}
					{selectedPosition && (
						<>
							<Marker position={selectedPosition} />
							{/**
					 * Mueve el mapa a la nueva ubicación tras seleccionar una sugerencia.
					 */}
							<FlyToLocation
								lat={selectedPosition[0]}
								lon={selectedPosition[1]}
							/>
						</>
					)}
				</MapContainer>
			</div>

			<div className="flex justify-between pt-1">
				<Button
					text="Back"
					bgColor="bg-neutral-100"
					textColor="text-neutral-700"
					size="w-28"
					onClick={onBack}
				/>
				<Button
					text="Finish"
					bgColor="bg-violet-500"
					textColor="text-neutral-0"
					size="w-28"
					onClick={() =>
						onFinish({
  address: selected?.display_name ?? "",
  city: selected?.display_name ?? "",
  lat: selected ? Number(selected.lat) : null,
  lng: selected ? Number(selected.lon) : null,
})
					}
					disabled={!selected}
				/>
			</div>
		</div>
	);
}
