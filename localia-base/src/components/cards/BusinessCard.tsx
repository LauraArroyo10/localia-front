import { Button } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";

/**
 * Props para la tarjeta de negocio.
 */
interface BusinessCardProps {
	business: LocalBusiness;
	onViewMore?: (id: string) => void;
}

/**
 * Tarjeta que muestra información resumida de un negocio
 * con opción de agregar a favoritos y ver más detalles.
 */
function BusinessCard({ business, onViewMore }: BusinessCardProps) {
	const { user } = useAuth();

	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	const favorite = isFavorite(business.id);

	/**
	 * Alterna el estado de favorito del negocio al hacer clic sobre el corazón.
	 */
	const handleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

		if (favorite) {
			await removeFavorite(business.id);
		} else {
			await addFavorite(business.id);
		}
	};

	return (
		<div className="max-w-sm overflow-hidden rounded-3xl border-0 bg-violet-900">
			<div className="relative">
				<img
					src={business.image_url ?? undefined}
					alt={business.name}
					className="h-55 w-full object-cover object-center"
				/>

				{user && (
					<div
						onClick={handleFavorite}
						className="absolute top-7 right-7 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-violet-50 text-4xl"
					>
						{favorite ? (
							<FaHeart className="text-red-500" />
						) : (
							<FaRegHeart className="text-violet-900" />
						)}
					</div>
				)}
			</div>

			<div className="px-7 py-7">
				<h2 className="text-2xl font-bold text-violet-50">{business.name}</h2>

				<div className="py-2">
					<p className="text-lg text-terracota-400">{business.location}</p>

					<p className="line-clamp-2 text-base text-violet-50">
						{business.description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<p className="text-base text-violet-50">{business.rating}</p>

						<StarRating rating={business.rating} />
					</div>

					<Button
						className="text-sm text-violet-50  bg-violet-500 w-25 h-10 rounded-4xl cursor-pointer hover:bg-violet-300"
						onClick={() => onViewMore?.(business.id)}
					>
						See more
					</Button>
				</div>
			</div>
		</div>
	);
}

export default BusinessCard;
