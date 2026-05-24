import { ImStarFull } from "react-icons/im";

interface StarRatingProps{
    rating: number;
    interactive?: boolean;
    //función que avisa qué estrella se clickeó
    onRate?: (value: number) => void;
    className?: string;
}

function StarRating(props: StarRatingProps) {

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex gap-1">
            {stars.map((starValue) => (
                <ImStarFull
                    key={starValue}
                    onClick={() => {
                        if (props.interactive && props.onRate) {
                            props.onRate(starValue);
                        }
                    }}
                    className={`
                    ${props.className ?? "text-base"}

                    ${starValue <= props.rating ? "text-yellow-400" : "text-gray-300"}
                    
                    ${props.interactive ? "cursor-pointer hover:scale-110" : ""} 
                    `}

                />
            ))}

        </div>
    );

}

export default StarRating;