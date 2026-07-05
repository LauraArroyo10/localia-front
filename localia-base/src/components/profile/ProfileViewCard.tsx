import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useFavorites } from "../../hooks/useFavorites";
import FavoritesPopup from "../ui/FavoritesPopup";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const destinationImg = "/img/destination-placeholder.jpg";

export interface ProfileViewProps {
	data: {
		businessName: string;
		subtitle: string;
		avatarUrl: string;
		bannerImgUrl: string;
		description: string;
		location: string;
		rating: number;
		lat?: number;
		lng?: number;
	};
	onEditClick?: () => void;
	showFavoritesButton?: boolean;
}

export default function ProfileView({
	data,
	onEditClick,
	showFavoritesButton = true,
}: ProfileViewProps) {
	const [showFavorites, setShowFavorites] = useState(false);
	const { favorites } = useFavorites();
	const navigate = useNavigate();

	const mappedFavorites = favorites.map((f) => ({
		id: f.businessId,
		name: f.name,
		imageUrl: f.image_url ? `${API_URL}${f.image_url}` : destinationImg,
		location: f.city ?? "",
	}));

	const handleLocationClick = () => {
	if (!data.lat || !data.lng) {
		console.warn("Missing coords");
		return;
	}

	navigate({
		to: "/locationPage",
		search: {
			lat: String(data.lat),
			lng: String(data.lng),
			location: data.location,
			name: data.businessName,
		},
	});
};

	return (
		<>
			<div className="w-full max-w-[1150px] bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-100">
				{/* Header */}
				<div className="bg-violet-50 px-10 py-8 flex justify-between items-center relative">
					<div>
						<h1 className="text-4xl font-semibold text-violet-500 tracking-wide mb-1">
							{data.businessName}
						</h1>

						<p className="text-2xl font-medium text-terracota-500">
							{data.subtitle}
						</p>
					</div>

					<div className="w-33 h-33 rounded-full overflow-hidden border-4 border-neutral-0 bg-neutral-0">
						<img
  src={data.avatarUrl}
  alt="Avatar"
  className="w-full h-full object-cover"
/>
					</div>

					{onEditClick && (
						<button
							onClick={onEditClick}
							className="absolute top-4 right-4 bg-neutral-0/80 hover:bg-neutral-0 text-neutral-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 transition-all cursor-pointer"
						>
							Editar Perfil
						</button>
					)}
				</div>

				{/* Content */}
				<div className="p-10">
					<div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-200 min-h-[420px]">
						{/* Left */}
						<div className="w-full md:w-[45%] bg-violet-500 p-8 text-neutral-0 flex flex-col justify-between">
							<div className="flex flex-col gap-3">
								<h2 className="text-2xl font-semibold tracking-wide">
									Description
								</h2>

								<p className="text-sm font-light text-neutral-0/90 leading-relaxed text-justify">
									{data.description}
								</p>
							</div>

							<div className="flex flex-col gap-4 mt-6">
								{showFavoritesButton && (
									<button
										onClick={() => setShowFavorites(true)}
										className="self-start px-6 py-3 bg-accent text-violet-900 rounded-full font-semibold hover:bg-accent-100 transition-all cursor-pointer text-sm"
									>
										View Favorites
									</button>
								)}

								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-semibold tracking-wide">
										Location
									</h3>

									<div className="flex items-center gap-3">
										<p className="text-xs font-light text-neutral-0/80">
											{data.location}
										</p>

										<button
											onClick={handleLocationClick}
											className="text-accent hover:text-accent-100 transition cursor-pointer"
											title="View location"
										>
											<FaMapMarkerAlt size={18} />
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Right */}
						<div className="w-full md:w-[55%] h-[420px] overflow-hidden">
							<img
								src={data.bannerImgUrl}
								alt="Business"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Favorites */}
			{showFavoritesButton && showFavorites && (
				<FavoritesPopup
					favorites={mappedFavorites}
					onClose={() => setShowFavorites(false)}
				/>
			)}
		</>
	);
}
