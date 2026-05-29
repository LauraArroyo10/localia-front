import { useState, useEffect, useRef } from "react";
import Button from '../../ui/Button';
import Input from '../../ui/Input';

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface StepLocationProps {
  onFinish: () => void;
  onBack: () => void;
}

export function StepLocation({ onFinish, onBack }: StepLocationProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Busca en Nominatim con debounce
  useEffect(() => {
    if (query.length < 3 || selected) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
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
  }, [query, selected]);

  const handleSelect = (s: Suggestion) => {
    setSelected(s);
    setQuery(s.display_name);
    setSuggestions([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelected(null);
  };

  const mapUrl = selected
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(selected.lon) - 0.05},${parseFloat(selected.lat) - 0.03},${parseFloat(selected.lon) + 0.05},${parseFloat(selected.lat) + 0.03}&layer=mapnik&marker=${selected.lat},${selected.lon}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-180,-85,180,85&layer=mapnik`;

  return (
    <div className="flex flex-col gap-4 w-full">
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
          <ul className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-2xl shadow-lg overflow-hidden">
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

      {/* Mapa */}
      <div className="w-full h-45  rounded-2xl overflow-hidden border border-neutral-200">
        <iframe
          title="location-map"
          width="100%"
          height="100%"
          src={mapUrl}
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      <div className="flex justify-between pt-1">
        <Button
          text="← Back"
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