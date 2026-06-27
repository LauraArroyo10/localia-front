import { useState, useEffect } from "react";
//el contenedor principal del mapa,carga imagenes del mapa, pin marcador,hook de acceso a instancias del mapa
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
//estilos del mapa
import "leaflet/dist/leaflet.css";
//libreria de leaflet 
import L from "leaflet";
import Button from '../../ui/Button';
import Input from '../../ui/Input';

//Fix del ícono de Leaflet con bundlers
//importacion de imagenes manualpor problemas entre leaflet y vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//elimina el metodo de leaflet que busca las imagenes y se sustituye por las que ingresamso manualemnte
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

// interface de la respuesta de la api nominatim 
//nominatim es un motor geocodificador, esto significa que 
//convierte nombres en coordeandas. nombre, latitud y longitud 
interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface StepLocationProps {
  //se despliega al confirmar la ubiccion 
  onFinish: () => void;
  //regresar
  onBack: () => void;
}

// Componente auxiliar — mueve el mapa cuando cambia la ubicación
// useMap() solo funciona DENTRO de <MapContainer>, por eso es un componente aparte
function FlyToLocation({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 15, { duration: 1.2 }); // zoom 15, animación 1.2s
  }, [lat, lon, map]);
  return null;
}

export function StepLocation({ onFinish, onBack }: StepLocationProps) {
  //bsuqueda del usuario
  const [query, setQuery] = useState("");
  //la sugerencia del buscador
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  //la sugerencia elegida
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);

  // Busca en Nominatim con debounce
  // deben haber 3
  useEffect(() => {
    if (query.length < 3 || selected) {
      setSuggestions([]);
      return;
    }

    // Esto es lo que se ve cuando se hace una bsuqueda y se autocompleta con resultados__________________________________________
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    // reinicio del contador de tiempo de la bsuqueda
    return () => clearTimeout(timer);
  }, [query, selected]);

  // Guarda y limpia __________________________________________
  const handleSelect = (s: Suggestion) => {
    setSelected(s);
    setQuery(s.display_name);
    setSuggestions([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelected(null);
  };

  // Posición inicial del mapa — Costa Rica como default
  const defaultPosition: [number, number] = [9.7489, -83.7534];
  const selectedPosition: [number, number] | null = selected
    ? [parseFloat(selected.lat), parseFloat(selected.lon)]
    : null;

  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-xl font-bold text-neutral-800 text-center">Where are you at?</h2>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          placeholder="Search your city or address..."
          value={query}
          onChange={handleChange}
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
          center={defaultPosition}
          zoom={7}
          style={{ width: "100%", height: "100%" }}
          zoomControl={true}
          scrollWheelZoom={false} // evita zoom accidental al scrollear el formulario
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          {/* Marker — solo aparece cuando hay una ubicación seleccionada */}
          {selectedPosition && (
            <>
              <Marker position={selectedPosition} />
              {/* Mueve el mapa a la nueva ubicación */}
              <FlyToLocation lat={selectedPosition[0]} lon={selectedPosition[1]} />
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
          onClick={onFinish}
          disabled={!selected}
        />
      </div>
    </div>
  );
}