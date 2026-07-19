import { type ChangeEvent, useRef, useState } from "react";

interface ProfileData {
  businessName: string;
  subtitle: string;
  avatarUrl: string;
  bannerImgUrl: string;
  description: string;
  location: string;
  rating: number;
  /**
   * Añade campos opcionales para transportar los archivos reales al backend.
   */
  avatarFile?: File;
  bannerFile?: File;
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
  const [formData, setFormData] = useState<ProfileData>({ ...initialData });
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  /**
   * Actualiza los valores del formulario cuando el usuario edita un campo.
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Guarda la imagen seleccionada para el avatar y crea una vista previa local.
   */
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatarFile: file, // El archivo real que irá al backend
        avatarUrl: URL.createObjectURL(file) // La vista previa visual instantánea
      }));
    }
  };

  /**
   * Guarda la imagen del banner y prepara una vista previa inmediata.
   */
  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        bannerFile: file, // El archivo real que irá al backend
        bannerImgUrl: URL.createObjectURL(file) // La vista previa visual instantánea
      }));
    }
  };

  return (
    <div className="w-full max-w-6xl bg-neutral-0 rounded-3xl overflow-hidden shadow-sm">
      
      {/* Header Edición */}
      <div className="bg-violet-50 px-10 py-8 flex justify-between items-center">
        <div className="flex flex-col gap-3 flex-1 pr-6 max-w-100">
          <label className="text-xs font-bold text-violet-500 uppercase tracking-wider">Nombre del Negocio</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="text-2xl font-semibold text-violet-500 bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-2 focus:outline-none"
          />
          <label className="text-xs font-bold text-terracota-500 uppercase tracking-wider mt-1">Sección / Rol</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="text-lg font-medium text-terracota-500 bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Círculo Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-neutral-0 bg-neutral-200 shadow-sm">
            {formData.avatarUrl ? (
              <img src={formData.avatarUrl} alt="Preview Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-neutral-300 flex items-center justify-center text-xs text-neutral-500">Sin foto</div>
            )}
          </div>
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="text-xs bg-violet-500 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer"
          >
            Subir Foto
          </button>
          <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
        </div>
      </div>

      {/* Cuerpo inferior */}
      <div className="p-10">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-200 min-h-105">
          
          {/* Lado Azul */}
          <div className="w-full md:w-[45%] bg-violet-500 p-8 text-white flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide">Edit Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full bg-neutral-0 text-neutral-800 text-sm rounded-xl p-3 focus:outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide">Edit Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-neutral-0 text-neutral-800 text-sm rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Lado del Banner */}
          <div className="w-full md:w-[55%] relative bg-neutral-100 flex flex-col items-center justify-center p-4 overflow-hidden">
            {formData.bannerImgUrl ? (
              <img src={formData.bannerImgUrl} alt="Preview Interior" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            ) : null}
            
            <button 
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="relative z-10 bg-neutral-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md cursor-pointer"
            >
              Cambiar Imagen del Local
            </button>
            <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 font-semibold text-sm cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="px-8 py-2.5 bg-violet-500 text-white font-semibold rounded-full text-sm cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

    </div>
  );
}

