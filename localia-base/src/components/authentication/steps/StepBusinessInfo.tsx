import { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { toast } from "sonner";
import { CATEGORIES } from "../../../types/categories";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/SelectInput";


/**
 * Opciones de categoría usadas por el selector de negocio.
 */
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

/**
 * Límite de tamaño de imagen en MB para el formulario de negocio.
 * Debe coincidir con el límite configurado en el backend.
 */
const MAX_IMAGE_SIZE_MB = 5;

/**
 * Código de país válido en formato internacional.
 */
const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;
/**
 * Formato de teléfono esperado: 8 dígitos sin separadores.
 */
const PHONE_REGEX = /^\d{8}$/;
const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 500;


/**
 * Props del paso de información de negocio.
 */
interface StepBusinessInfoProps {
	onNext: (data: any) => void;
	onBack: () => void;
}

/**
 * Paso del asistente que recopila datos clave del negocio y su imagen.
 * Valida teléfono, descripción e imagen antes de avanzar.
 */
export function StepBusinessInfo({ onNext, onBack }: StepBusinessInfoProps) {
	/**
	 * Mantiene la imagen seleccionada y su vista previa para el formulario.
	 */
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [phone, setPhone] = useState("");
	const [countryCode, setCountryCode] = useState("+506");

	/**
	 * Guarda la imagen seleccionada y prepara una vista previa para el usuario.
	 */
	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
		if (file.size > maxBytes) {
			toast.error(
				`La imagen pesa demasiado (máximo ${MAX_IMAGE_SIZE_MB}MB). Elegí una imagen más liviana.`,
				{ style: { background: "#ab0000", color: "#ffffff" } },
			);
			/**
			 * Limpia el input para permitir reintentar con otro archivo.
			 */
			e.target.value = "";
			return;
		}

		setImage(file);
		const reader = new FileReader();
		reader.onloadend = () => setPreview(reader.result as string);
		reader.readAsDataURL(file);
	};

	/**
	 * Ajusta el código de país para que solo acepte un formato válido.
	 */
	const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		/**
		 * Normaliza el valor para conservar solo dígitos y un signo + inicial.
		 */
		let value = e.target.value.replace(/[^\d+]/g, "");
		if (!value.startsWith("+")) value = `+${value.replace(/\+/g, "")}`;
		value = "+" + value.slice(1).replace(/\+/g, "");
		value = value.slice(0, 5);
		setCountryCode(value);
	};

	/**
	 * Mantiene el teléfono en un formato numérico simple durante la edición.
	 */
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		/**
		 * Conserva solo dígitos numéricos y limita el largo a 8 caracteres.
		 */
		const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 8);
		setPhone(digitsOnly);
	};

	const isValid =
		name.trim().length > 0 &&
		category.trim().length > 0 &&
		phone.trim().length > 0 &&
		description.trim().length > 0 &&
		image !== null;

	/**
	 * Valida la información del negocio antes de pasar al siguiente paso.
	 */
	const handleNext = () => {
		if (!COUNTRY_CODE_REGEX.test(countryCode)) {
			toast.error("Ingresá un código de país válido (ej: +506).", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
			return;
		}

		if (!PHONE_REGEX.test(phone)) {
			toast.error("El número de teléfono debe tener exactamente 8 dígitos.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
			return;
		}

		const descLength = description.trim().length;

		if (descLength < MIN_DESCRIPTION_LENGTH) {
			toast.error(
				`La descripción debe tener al menos ${MIN_DESCRIPTION_LENGTH} caracteres.`,
				{ style: { background: "#ab0000", color: "#ffffff" } },
			);
			return;
		}

		if (descLength > MAX_DESCRIPTION_LENGTH) {
			toast.error(
				`La descripción no puede superar los ${MAX_DESCRIPTION_LENGTH} caracteres.`,
				{ style: { background: "#ab0000", color: "#ffffff" } },
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
					onChange={(e) =>
						setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))
					}
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
