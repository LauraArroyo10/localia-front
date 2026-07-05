// src/components/profile/TouristProfileCard.tsx
import { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useFavorites } from "../../hooks/useFavorites";
import FavoritesPopup from "../ui/FavoritesPopup";

const destinationImg = "/img/destination-placeholder.jpg";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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
		imageUrl: f.image_url ? `${API_URL}${f.image_url}` : destinationImg,
		location: f.city ?? "",
	}));

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const localUrl = URL.createObjectURL(file);
		setPreviewUrl(localUrl);

		onAvatarChange?.(file);
	};

	// Si viene de previewUrl (blob local) se usa directo; si viene de la DB (avatarUrl) le sumamos el host del backend
const displayedAvatar = previewUrl 
    ? previewUrl 
    : (avatarUrl ? (avatarUrl.startsWith("http") ? avatarUrl : `${API_URL}${avatarUrl}`) : null);

	return (
		<div className="w-full max-w-[1150px] bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-100">
			{/* Header */}
			<div className="bg-violet-50 px-10 py-8 flex justify-between items-center relative">
				<div>
					<h1 className="text-4xl font-semibold text-violet-500 tracking-wide mb-1">
						{name}
					</h1>
					<p className="text-2xl font-medium text-terracota-500">Tourist</p>
				</div>

				{/* Avatar */}
				<div className="w-33 h-33 rounded-full overflow-hidden border-4 border-neutral-0 bg-neutral-0">
					{displayedAvatar ? (
						<img
							src={displayedAvatar}
							alt="Avatar"
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full bg-violet-200 flex items-center justify-center text-violet-700">
							<FaUserCircle className="w-16 h-16 opacity-80" />
						</div>
					)}
				</div>

				{/* Botón cambiar foto */}
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

			{/* Body */}
			<div className="p-10">
				<div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-200 min-h-[100px]">
					<div className="w-full bg-violet-500 p-8 text-neutral-0 flex flex-col justify-between">
						<div className="flex flex-col gap-3">
							<p className="text-sm font-light text-neutral-0/90 leading-relaxed" />
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

			{/* Favorites modal */}
			{showFavorites && (
				<FavoritesPopup
					favorites={mappedFavorites}
					onClose={() => setShowFavorites(false)}
				/>
			)}
		</div>
	);
}
