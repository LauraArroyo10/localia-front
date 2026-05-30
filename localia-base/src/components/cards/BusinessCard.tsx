import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";
import { Card, Button } from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

interface BusinessCardProps {
  business: LocalBusiness;
  onViewMore?: (id: number) => void;
  size?: "large" | "small";
}

function BusinessCard({ business, onViewMore, size }: BusinessCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
const isSmall = size === "small";
  return (
    <Card
  className={`overflow-hidden rounded-3xl bg-violet-900 border-0 ${isSmall ? "max-w-70" : "max-w-sm"}`}
>
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className={`w-full object-cover object-center ${isSmall ? "h-46" : "h-55" }`}
        />
        <div
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex items-center justify-center bg-violet-50 rounded-4xl w-14 h-14 absolute top-7 right-7 text-4xl cursor-pointer z-10"
        >
          {isFavorite ? (
            <FaHeart className="text-terracota-500" />
          ) : (
            <FaRegHeart className="text-violet-900" />
          )}
        </div>
      </div>

      <div className="px-7 pt-1 pb-7">
        <h2 className="text-2xl font-bold text-violet-50">
          {business.name}
        </h2>

        <div className="py-2">
          <p className="text-terracota-400 text-lg">
            {business.location}
          </p>
          <p className="text-violet-50 text-base line-clamp-2">
            {business.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base text-violet-50">
              {business.rating}
            </p>
            

<div className="px-2">
<StarRating
  rating={business.rating}
  className={isSmall ? "text-sm" : "text-lg"}
/>
</div>

          </div>

          <Button
  className={`text-violet-50 bg-violet-500 cursor-pointer hover:bg-violet-700 ${
    isSmall
      ? "text-xs w-20 h-9 rounded-2xl"
      : "text-base w-34 h-13 rounded-3xl"
  }`}
  onClick={() => onViewMore?.(business.id)}
>
  See more
</Button>
        </div>
      </div>

    </Card>
  );
}

export default BusinessCard;