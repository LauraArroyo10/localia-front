import { Button } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";

interface RecommendationCardProps {
  business: LocalBusiness;
  onViewMore?: (id: string) => void;
}

/**
 * Tarjeta de recomendación que muestra un negocio y su valoración.
 * Incluye acción de favorito y acceso a más detalles.
 */
function RecommendationCard({ business, onViewMore }: RecommendationCardProps) {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const favorited = isFavorite(business.id);

  /**
   * Cambia el estado de favorito del negocio desde la tarjeta de recomendación.
   */
  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(business.id);
    } else {
      addFavorite(business.id);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-3xl bg-violet-900 border-0 flex flex-col">
      <div className="relative flex-shrink-0">
        <img
          src={business.image_url ?? undefined}
          alt={business.name}
          className="w-full h-46 object-cover object-center"
        />

        {user && (
          <div
            onClick={handleToggleFavorite}
            className="absolute top-7 right-7 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-violet-50 text-4xl"
          >
            {favorited ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-violet-900" />
            )}
          </div>
        )}
      </div>

      <div className="px-5 py-5 flex-1 overflow-hidden flex flex-col">
        <h2 className="text-xl font-bold text-violet-50 truncate">
          {business.name}
        </h2>

        <div className="py-1 flex-1 overflow-hidden">
          <p
            className="text-terracota-400 text-base truncate"
            title={business.location}
          >
            {business.location}
          </p>

          <p className="text-violet-50 text-sm line-clamp-2">
            {business.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 shrink-0">
          <div className="flex items-center gap-2">
            <p className="text-sm text-violet-50">{business.rating}</p>

            <StarRating className="text-sm" rating={business.rating} />
          </div>

          <Button
            className="text-sm text-violet-50 bg-violet-500 w-25 h-10 rounded-4xl cursor-pointer hover:bg-violet-300"
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