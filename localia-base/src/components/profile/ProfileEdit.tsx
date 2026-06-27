import { type ChangeEvent, useRef, useState } from "react";

interface ProfileData {
	businessName: string;
	subtitle: string;
	avatarUrl: string;
	bannerImgUrl: string;
	description: string;
	location: string;
	rating: number;
}

interface ProfileEditProps {
	initialData: ProfileData;
	onSave: (updatedData: ProfileData) => void;
	onCancel: () => void;
}

export default function ProfileEdit({
	initialData,
	onSave,
	onCancel,
}: ProfileEditProps) {
	//Se usa useref , hook que permite que un dato sea mutable durante el ciclo del com pnente
	const [formData, setFormData] = useState<ProfileData>({ ...initialData });
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Tipado limpio como ChangeEvent directamente
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setFormData((prev) => ({ ...prev, avatarUrl: imageUrl }));
		}
	};

  return (
    <div className="w-full max-w-[1150px] bg-neutral-0 rounded-3xl  overflow-hidden ">
      
      {/* Header Edición */}
      <div className="bg-violet-50 px-10 py-8 flex justify-between items-center ">
        <div className="flex flex-col gap-3 flex-1 pr-6 max-w-[400px]">
          <label className="text-xs font-bold text-violet-500 uppercase tracking-wider">Nombre del Negocio</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="text-2xl font-semibold text-violet-500 bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <label className="text-xs font-bold text-terracota-500 uppercase tracking-wider mt-1">Sección / Rol</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="text-lg font-medium text-terracota-500 bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracota-500"
          />
        </div>

        {/* Círculo cambiador de imagen */}
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-neutral-0  bg-neutral-200 relative">
            <img src={formData.avatarUrl} alt="Preview Avatar" className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center text-neutral-0 text-xs font-medium text-center p-2">
              Cambiar Foto
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
      </div>

      {/* Cuerpo inferior */}
      <div className="p-10">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-200  min-h-[420px]">
          
          {/* Lado Azul */}
          <div className="w-full md:w-[45%] bg-violet-500 p-8 text-white flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide">Edit Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full bg-neutral-0 text-neutral-800 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-neutral-0/50 leading-relaxed resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide">Edit Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-neutral-0 text-neutral-800 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-0/50"
              />
            </div>
          </div>

          {/* Lado de Imagen de Fondo */}
          <div className="w-full md:w-[55%] relative bg-neutral-0">
            <img src={formData.bannerImgUrl} alt="Preview Interior" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-6 gap-2">
              <label className="text-neutral-0 text-xs font-bold bg-neutral-950/50 px-3 py-1 rounded-full ">URL de la imagen del local:</label>
              <input
                type="text"
                name="bannerImgUrl"
                value={formData.bannerImgUrl}
                onChange={handleChange}
                className="w-[90%] bg-neutral-0 text-neutral-800 text-xs rounded-lg px-3 py-2  focus:outline-none"
                placeholder="Pegar enlace de imagen (http...)"
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-all cursor-pointer text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-8 py-2.5 bg-violet-500 hover:bg-violet-300 text-neutral-0 font-semibold rounded-full  transition-all cursor-pointer text-sm"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

    </div>
  );
}
