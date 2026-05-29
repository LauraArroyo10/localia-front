// steps/StepBusinessInfo.tsx
// Paso 2 (solo vendedores)

import { useState, useRef } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
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
  const [phone, setPhone] = useState("");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const isValid =
    name.trim().length > 0 &&
    category.trim().length > 0 &&
    phone.trim().length > 0 &&
    description.trim().length > 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold text-neutral-800 text-center">
        Business Information
      </h2>

      {/* Image upload */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center overflow-hidden hover:bg-violet-100 transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Business preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <MdCameraAlt size={26} className="text-violet-500" />
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
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full h-[44px] rounded-full border border-neutral-300 bg-white text-sm px-5 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 appearance-none"
      >
        <option value="" disabled>
          Category*
        </option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <Input
        type="tel"
        placeholder="Phone Number*"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Description*"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full rounded-2xl border border-neutral-300 bg-white text-sm px-5 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
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
          textColor="text-white"
          size="w-28"
          onClick={onNext}
          disabled={!isValid}
        />
      </div>
    </div>
  );
}