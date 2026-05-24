import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";
import { Card, Button } from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

interface RecommendationCardProps{
    business: LocalBusiness;
    onViewMore?: (id: number) => void;
    
}

function RecommendationCard({ business, onViewMore }: RecommendationCardProps) {

    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card className="max-w-70 overflow-hidden rounded-3xl bg-violet-900 border-0">

    <div className="relative">

        <img
            src={business.image}
            alt=""
            className="w-full h-46 object-cover object-center"
        />

        <div
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center justify-center bg-[#E4E6F7] rounded-4xl w-9 h-9 absolute top-4 right-4 text-2xl cursor-pointer z-10"
        >
            {isFavorite ? (
                <FaHeart className="text-[#AB0000]" />
            ) : (
                <FaRegHeart className="text-violet-900" />
            )}
        </div>

    </div>

    <div className="px-5 pb-6">

        <h2 className="text-xl font-bold text-[#E4E6F7]">
            {business.name}
        </h2>

        <div className="py-1">

            <p className="text-[#E2725B] text-base">
                {business.location}
            </p>

            <p className="text-[#E4E6F7] text-sm line-clamp-2">
                {business.description}
            </p>

        </div>

        <div className="flex items-center justify-between pt-2">

            <div className="flex items-center gap-2">
                <p className="text-sm text-[#E4E6F7]">
                    {business.rating}
                </p>

                <StarRating className="text-sm" rating={business.rating} />
            </div>

            <Button
                className="text-sm text-[#E4E6F7] bg-[#4D55C8] w-25 h-9 rounded-4xl cursor-pointer hover:bg-[#616BFD]"
                onClick={() => onViewMore?.(business.id)}
            >
                See more
            </Button>

        </div>

    </div>

</Card>
    )

}

export default RecommendationCard;