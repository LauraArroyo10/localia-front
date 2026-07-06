import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface BusinessLocationMapProps {
	latitude: number;
	longitude: number;
	location: string;
}

/**
 * Renderiza un mapa con la ubicación del negocio seleccionada.
 */
export default function BusinessLocationMap({
	latitude,
	longitude,
	location,
}: BusinessLocationMapProps) {
	return (
		<div className="w-[60%] mx-auto h-125 rounded-3xl overflow-hidden">
			<MapContainer
				center={[latitude, longitude]}
				zoom={15}
				style={{ width: "100%", height: "100%" }}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

				<Marker position={[latitude, longitude]}>
					<Popup>{location}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
