// src/components/profile/TouristProfileCard.tsx
import { useState, useRef } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import FavoritesPopup from "../ui/FavoritesPopup";
import destinationImg from "../../assets/brand/destination-placeholder.jpg";

export interface TouristProfileViewProps {
	name: string;
	avatarUrl?: string;
	location?: string;
	onAvatarChange?: (file: File) => void;
}

export default function TouristProfileView({
	name,
	avatarUrl,
	location,
	onAvatarChange,
}: TouristProfileViewProps) {
	const [showFavorites, setShowFavorites] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const { favorites } = useFavorites();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const mappedFavorites = favorites.map((f) => ({
		id: f.businessId,
		name: f.name,
		avatarUrl: f.image_url ?? destinationImg,
		location: f.city ?? "",
	}));

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Vista previa local inmediata
		const localUrl = URL.createObjectURL(file);
		setPreviewUrl(localUrl);

		if (onAvatarChange) {
			onAvatarChange(file);
		}
	};

	const displayedAvatar = previewUrl ?? avatarUrl;

	return (
		<div className="w-full max-w-[1150px] bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-100">
			{/* Bloque Superior Lila */}
			<div className="bg-violet-50 px-10 py-8 flex justify-between items-center relative">
				<div>
					<h1 className="text-4xl font-semibold text-violet-500 tracking-wide mb-1">
						{name}
					</h1>
					<p className="text-2xl font-medium text-terracota-500">Tourist</p>
				</div>

				{/* Avatar Circular */}
				<div className="w-33 h-33 rounded-full overflow-hidden border-4 border-neutral-0 bg-neutral-0">
					{displayedAvatar ? (
						<img src={displayedAvatar} alt="Avatar" className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full bg-violet-200 flex items-center justify-center text-violet-700 text-4xl font-bold">
							{name.charAt(0).toUpperCase()}
						</div>
					)}
				</div>

				{/* Botón flotante para cambiar foto */}
				<button
					onClick={() => fileInputRef.current?.click()}
					className="absolute top-4 right-4 bg-neutral-0/80 hover:bg-neutral-0 text-neutral-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 transition-all cursor-pointer"
				>
					Cambiar Foto
				</button>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
				/>
			</div>

			{/* Bloque de Información Inferior */}
			<div className="p-10">
				<div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-200 min-h-[420px]">
					<div className="w-full bg-violet-500 p-8 text-neutral-0 flex flex-col justify-between">
						<div className="flex flex-col gap-3">
							<p className="text-sm font-light text-neutral-0/90 leading-relaxed">
						
							</p>
						</div>

						<div className="flex flex-col gap-4 mt-6">
							<button
								onClick={() => setShowFavorites(true)}
								className="self-start px-6 py-3 bg-accent text-violet-900 rounded-full font-semibold hover:bg-accent-100 transition-all cursor-pointer text-sm"
							>
								View Favorites
							</button>
						</div>
					</div>
				</div>
			</div>

			{showFavorites && (
				<FavoritesPopup
					favorites={mappedFavorites}
					onClose={() => setShowFavorites(false)}
				/>
			)}
		</div>
	);
}