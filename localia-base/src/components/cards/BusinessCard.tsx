import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";
import { Button } from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

interface BusinessCardProps {
  business: LocalBusiness;
  onViewMore?: (id: number) => void;
}

function BusinessCard({ business, onViewMore }: BusinessCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="max-w-sm overflow-hidden rounded-3xl bg-violet-900 border-0">
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-55 object-cover object-center"
        />

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
      </div>

      <div className="px-7 py-7">
        <h2 className="text-2xl font-bold text-violet-50">
          {business.name}
        </h2>

        <div className="py-2">
          <p className="text-lg text-terracota-400">
            {business.location}
          </p>

          <p className="line-clamp-2 text-base text-violet-50">
            {business.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base text-violet-50">
              {business.rating}
            </p>

            <StarRating rating={business.rating} />
          </div>

          <Button
            className="h-13 w-28 cursor-pointer rounded-3xl bg-violet-500 text-base text-violet-50 hover:bg-violet-300"
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