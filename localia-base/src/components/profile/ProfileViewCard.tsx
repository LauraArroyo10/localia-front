// src/components/profile/ProfileView.tsx

export interface ProfileViewProps {
	data: {
		businessName: string;
		subtitle: string;
		avatarUrl: string;
		bannerImgUrl: string;
		description: string;
		location: string;
		rating: number;
	};
	onEditClick: () => void; // Función que avisa a la página padre que queremos editar
}

export default function ProfileView({ data, onEditClick }: ProfileViewProps) {
  return (
    
    <div className="w-full max-w-[1150px] bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-100">
      {/* Se podria poner de tamaño de 1200 px pero se ve raro }
      {/* Bloque Superior Lila */}
      <div className="bg-violet-50 px-10 py-8 flex justify-between items-center relative">
        <div>
          <h1 className="text-4xl font-semibold text-violet-500 tracking-wide mb-1">
            {data.businessName}
          </h1>
          <p className="text-2xl font-medium text-terracota-500">
            {data.subtitle}
          </p>
        </div>

        {/* Avatar Circular */}
        <div className="w-33 h-33 rounded-full overflow-hidden border-4 border-neutral-0  bg-neutral-0">
          <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        </div>

        {/* Botón flotante para activar edición */}
        <button
          onClick={onEditClick}
          className="absolute top-4 right-4 bg-neutral-0/80 hover:bg-neutral-0 text-neutral-700 px-4 py-1.5 rounded-full text-xs font-semibold  border border-neutral-200 transition-all cursor-pointer"
        >
          Editar Perfil
        </button>
      </div>

      {/* Bloque de Información Inferior */}
      <div className="p-10">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-200  min-h-[420px]">
          
          {/* Sub-tarjeta Izquierda (Azul de Localia) */}
          <div className="w-full md:w-[45%] bg-violet-500 p-8 text-neutral-0 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-wide">Description</h2>
              <p className="text-sm font-light text-neutral-0/90 leading-relaxed text-justify">
                {data.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold tracking-wide">Location</h3>
                <p className="text-xs font-light text-neutral-0/80">{data.location}</p>
              </div>

            
            </div>
          </div>

          {/* Sub-tarjeta Derecha (Foto de la cafetería) */}
          <div className="w-full md:w-[55%] bg-neutral-100">
            <img src={data.bannerImgUrl} alt="Business Interior" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>

    </div>
  );
}
