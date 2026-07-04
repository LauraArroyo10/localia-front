import { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { toast } from "sonner";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/SelectInput";
import { CATEGORIES } from "../../../types/categories";

//convierte el array en el formato que necesita el componente que select (que e sel que usa esta info)
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

const MAX_IMAGE_SIZE_MB = 5; // debe coincidir con el límite de multer en el backend (src/middleware/upload.ts)

const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/; // ej: +506, +1, +52
const PHONE_REGEX = /^\d{8}$/; // 8 dígitos exactos, sin espacios ni guiones
const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 500;

//botones siguewinte atras
interface StepBusinessInfoProps {
	onNext: (data: any) => void;
	onBack: () => void;
}

export function StepBusinessInfo({ onNext, onBack }: StepBusinessInfoProps) {
  //preview de la imagen a subir
  const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [phone, setPhone] = useState("");
	const [countryCode, setCountryCode] = useState("+506");

	//manejo de imagenes subidas
	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		//valoracion para ver si file es null
		const file = e.target.files?.[0];
		//sin archivo no se hace nada
    if (!file) return;

    //validacion de tamaño ANTES de guardar el archivo (debe coincidir con el limite del backend)
    const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(
        `La imagen pesa demasiado (máximo ${MAX_IMAGE_SIZE_MB}MB). Elegí una imagen más liviana.`,
        { style: { background: "#ab0000", color: "#ffffff" } }
      );
      e.target.value = ""; // limpia el input para permitir reintentar con otro archivo
      return;
    }

    setImage(file);
		//api para leer archivos locales, esto abre la ventana de documentos locales
		//cuando esto pasa se hace lectur ay convesion e archivo
		const reader = new FileReader();
		//cuando se termine de leer el archivo , se guarda el resultado en preview
		reader.onloadend = () => setPreview(reader.result as string);
		reader.readAsDataURL(file);
	};

	//solo permite + al inicio y dígitos, hasta 4 dígitos después del +
	const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/[^\d+]/g, ""); // solo dígitos y +
		if (!value.startsWith("+")) value = `+${value.replace(/\+/g, "")}`;
		value = "+" + value.slice(1).replace(/\+/g, ""); // solo un + permitido, al inicio
		value = value.slice(0, 5); // "+" + hasta 4 dígitos
		setCountryCode(value);
	};

	//solo permite dígitos y hasta 8 caracteres mientras el usuario escribe
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 8);
		setPhone(digitsOnly);
	};

	const isValid =
		name.trim().length > 0 &&
		category.trim().length > 0 &&
		phone.trim().length > 0 &&
		description.trim().length > 0;

	const handleNext = () => {
		if (!COUNTRY_CODE_REGEX.test(countryCode)) {
			toast.error(
				"Ingresá un código de país válido (ej: +506).",
				{ style: { background: "#ab0000", color: "#ffffff" } }
			);
			return;
		}

		if (!PHONE_REGEX.test(phone)) {
			toast.error(
				"El número de teléfono debe tener exactamente 8 dígitos.",
				{ style: { background: "#ab0000", color: "#ffffff" } }
			);
			return;
		}

		const descLength = description.trim().length;

		if (descLength < MIN_DESCRIPTION_LENGTH) {
			toast.error(
				`La descripción debe tener al menos ${MIN_DESCRIPTION_LENGTH} caracteres.`,
				{ style: { background: "#ab0000", color: "#ffffff" } }
			);
			return;
		}

		if (descLength > MAX_DESCRIPTION_LENGTH) {
			toast.error(
				`La descripción no puede superar los ${MAX_DESCRIPTION_LENGTH} caracteres.`,
				{ style: { background: "#ab0000", color: "#ffffff" } }
			);
			return;
		}

		onNext({
			name,
			category,
			description,
			phone: `${countryCode}${phone}`,
			image,
		});
	};

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
						<img
							src={preview}
							alt="Business preview"
							className="w-full h-full object-cover"
						/>
					) : (
						<MdCameraAlt size={26} className="text-violet-500" />
					)}
				</label>
				{/* este input abre el explorador de archivos  */}
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

			<div className="flex gap-2">
				<div className="w-24">
					<Input
						type="text"
						placeholder="+506"
						value={countryCode}
						onChange={handleCountryCodeChange}
					/>
				</div>
				<div className="flex-1">
					<Input
						type="tel"
						placeholder="Phone Number* (8 digits)"
						value={phone}
						onChange={handlePhoneChange}
					/>
				</div>
			</div>

      <div className="flex flex-col gap-1">
        <textarea
          placeholder="Description*"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
          rows={3}
          className="w-full rounded-2xl border border-neutral-300 bg-neutral-0 text-sm px-5 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
        />
        <span className="text-xs text-neutral-400 text-right">
          {description.trim().length}/{MAX_DESCRIPTION_LENGTH}
        </span>
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
					text="Next"
					bgColor="bg-violet-500"
					textColor="text-white"
					size="w-28"
					onClick={handleNext}
					disabled={!isValid}
				/>
			</div>
		</div>
	);
}