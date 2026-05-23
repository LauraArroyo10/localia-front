import type { LocalBusiness } from "../../types/localBusiness";
import StarRating from "../ui/StarRating";
import { Card, Button } from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

interface BusinessCardProps{
    business: LocalBusiness;
    onViewMore?: (id: number) => void;
    
}

function BusinessCard({ business, onViewMore }: BusinessCardProps) {

    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card className="max-w-sm overflow-hidden rounded-3xl bg-violet-900 border-0">

    <div className="relative">
        <img
            src={business.image}
            alt=""
            className="w-full h-55 object-cover object-center"
        />

        <div
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center justify-center bg-[#E4E6F7] rounded-4xl w-14 h-14 absolute top-7 right-7 text-4xl cursor-pointer z-10">
            {isFavorite ? (
                <FaHeart className="text-[#AB0000]" />
            ) : (
                <FaRegHeart className="text-violet-900" />
            )}
        </div>
    </div>

    <div className="px-7 pt-1 pb-7">

        <h2 className="text-2xl font-bold text-[#E4E6F7]">
            {business.name}
        </h2>

        <div className="py-2">
            <p className="text-[#E2725B] text-lg">
                {business.location}
            </p>

            <p className="text-[#E4E6F7] text-base line-clamp-2">
                {business.description}
            </p>
        </div>

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
                <p className="text-base text-[#E4E6F7]">
                    {business.rating}
                </p>

                <StarRating rating={business.rating} />
            </div>

            <Button
                className="text-base text-[#E4E6F7] bg-[#4D55C8] w-28 h-13 rounded-3xl cursor-pointer hover:bg-[#616BFD]"
                onClick={() => onViewMore?.(business.id)}
            >
                See more
            </Button>

        </div>

    </div>

</Card>
    )

}

export default BusinessCard;