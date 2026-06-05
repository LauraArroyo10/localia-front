import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/SelectInput";
import { MdCameraAlt } from "react-icons/md";

//borrar esatas categorias de prueba 
const CATEGORIES = [
  "Gastronomy",
  "Tours & Adventures",
  "Wellness",
  "Accommodation",
  "Transport",
  "Shopping"
];

//convierte el array en el formato que necesita el componente que select (que e sel que usa esta info)
const CATEGORY_OPTIONS = CATEGORIES.map((c) => 
  ({ value: c, label: c }));

//botones siguewinte atras 
interface StepBusinessInfoProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepBusinessInfo({ onNext, onBack }: StepBusinessInfoProps) {
  //preview de la imagen a subir
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");


  //manejo de imagenes subidas 
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //valoracion para ver si file es null
    const file = e.target.files?.[0];
    //sin archivo no se hace nada 
    if (!file) return;
    //api para leer archivos locales, esto abre la ventana de documentos locales
    //cuando esto pasa se hace lectur ay convesion e archivo 
    const reader = new FileReader();
    //cuando se termine de leer el archivo , se guarda el resultado en preview
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const isValid =
    name.trim().length > 0 &&
    category.trim().length > 0 &&
    phone.trim().length > 0 &&
    description.trim().length > 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-xl font-bold text-neutral-800 text-center">
        Business Information
      </h2>

      <div className="flex justify-center">
        <label
          htmlFor="business-photo"
          className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center overflow-hidden hover:bg-violet-100 transition cursor-pointer"
        >
          {preview ? (
            <img src={preview} alt="Business preview" className="w-full h-full object-cover" />
          ) : (
            <MdCameraAlt size={26} className="text-violet-500" />
          )}
        </label>
        //este input abre el explorador de archivos 
        <input
          id="business-photo"
          //indica selector de archivos 
          type="file"
          //solo acepta imagenes
          accept="image/*"
          className="hidden"
          //genera preview
          onChange={handleFile}
          
        />
      </div>

      <Input
        placeholder="Business Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Select
        value={category}
        onChange={(value) => setCategory(value)}
        placeholder="Category*"
        options={CATEGORY_OPTIONS}
      />

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
          text="Back"
          bgColor="bg-neutral-100"
          textColor="text-neutral-700"
          size="w-28"
          onClick={onBack}
        />
        <Button
          text="Next"
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