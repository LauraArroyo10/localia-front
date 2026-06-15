export interface ProfileHeaderProps {
    businessName: string;
    subtitle: string;
    avatarUrl: string;
    onEditClick: () => void;
}

export default function ProfileHeader({
    businessName,
    subtitle,
    avatarUrl,
    onEditClick,
}: ProfileHeaderProps) {
    return (
    <div className="w-full flex justify-center" >
    <div className="  w-full max-w-[1150px] bg-white rounded-3xl overflow-hidden border border-gray-100">

    <div className="bg-violet-100 px-10 py-8 flex justify-between items-center relative">
        
        <div>
        <h1 className="text-4xl font-semibold text-violet-500 tracking-wide mb-1">
            {businessName}
        </h1>

        <p className="text-2xl font-medium text-terracota-500">
            {subtitle}
        </p>
        </div>


      {/* Avatar Circular */}
        <div className="w-33 h-33 rounded-full overflow-hidden border-4 border-white bg-white">
        <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="w-full h-full object-cover" 
        />
        </div>


      {/* Botón editar */}
        <button
        onClick={onEditClick}
        className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-200 transition-all cursor-pointer"
        >
        Editar Perfil
        </button>

            </div>
            </div>
            </div>
    );
}