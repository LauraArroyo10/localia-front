import { Button } from "flowbite-react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";
import { useAuth } from "../../hooks/useAuth";

interface RecommendationCardProps {
	business: LocalBusiness;
	onViewMore?: (id: string) => void;
}

function RecommendationCard({ business, onViewMore }: RecommendationCardProps) {
	const [isFavorite, setIsFavorite] = useState(false);
	const { user } = useAuth();

	return (
		<div className="max-w-70 overflow-hidden rounded-3xl bg-violet-900 border-0">
			<div className="relative">
				<img
					src={business.image}
					alt=""
					className="w-full h-46 object-cover object-center"
				/>

				{user && (
					<div
						onClick={() => setIsFavorite(!isFavorite)}
						className="absolute top-7 right-7 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-violet-50 text-4xl"
					>
						{isFavorite ? (
							<FaHeart className="text-red-500" />
						) : (
							<FaRegHeart className="text-violet-900" />
						)}
					</div>
				)}
			</div>

			<div className="px-5 py-5">
				<h2 className="text-xl font-bold text-violet-50 ">{business.name}</h2>

				<div className="py-1">
					<p className="text-terracota-400 text-base">{business.location}</p>

					<p className="text-violet-50 text-sm line-clamp-2">
						{business.description}
					</p>
				</div>

				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center gap-2">
						<p className="text-sm text-violet-50 ">{business.rating}</p>

						<StarRating className="text-sm" rating={business.rating} />
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

export default RecommendationCard;
