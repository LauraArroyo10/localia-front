// steps/StepBusinessInfo.tsx
// Paso 2 (solo vendedores) – replica el Frame 321 de Localia.
// Recoge foto, nombre del negocio, categoría y descripción.

import { useState, useRef } from "react";
import Button from '../ui/Button';
import Input from '../ui/Input';
import { MdCameraAlt } from "react-icons/md";

const CATEGORIES = [
  "Gastronomy",
  "Tours & Adventures",
  "Wellness",
  "Accommodation",
  "Transport",
  "Shopping",
  "Entertainment",
  "Other",
];

interface StepBusinessInfoProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepBusinessInfo({ onNext, onBack }: StepBusinessInfoProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const isValid = name.trim() && category && description.trim();

  return (
   <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold text-neutral-800 text-center">Business Information</h2>

      {/* Avatar / foto */}
      <div className="flex justify-center">
       <button
  type="button"
  onClick={() => fileRef.current?.click()}
  className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center overflow-hidden transition-colors hover:bg-violet-100"
>
  {preview ? (
    <img src={preview} alt="business" className="w-full h-full object-cover" />
  ) : (
    <span className="text-violet-500">
      <MdCameraAlt size={26} />
    </span>
  )}
</button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      <Input
        placeholder="Business Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Select nativo con tus estilos */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full h-[43.79px] rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 px-5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none"
      >
        <option value="" disabled>Category*</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Textarea nativo */}
      <textarea
        placeholder="Description*"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        required
        className="w-full rounded-2xl border border-neutral-300 bg-white text-sm text-neutral-800 px-5 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-neutral-400 resize-none"
      />

      <div className="flex justify-between pt-1">
        <Button
          text="← Back"
          bgColor="bg-neutral-100"
          textColor="text-neutral-700"
          size="w-28"
          onClick={onBack}
        />
        <Button
          text="Next →"
          bgColor="bg-violet-500"
          textColor="text-neutral-0"
          size="w-28"
          onClick={onNext}
          disabled={!isValid}
        />
      </div>
    </div>
  );
}