import { useState } from "react";

import destinationImg from "../../assets/brand/destination-placeholder.jpg";
import foodImg from "../../assets/brand/food.jpg";

export function Carousel() {
	const [current, setCurrent] = useState(0);

	// Array local
	const bannerSlides = [
		{ id: 1, image: destinationImg, alt: "Beautiful beach destination" },
		{ id: 2, image: foodImg, alt: "Delicius food" },
		{ id: 3, image: foodImg, alt: "Delicius food" },
		{ id: 4, image: foodImg, alt: "Delicius food" },
	];

	const prev = () =>
		setCurrent((i) => (i - 1 + bannerSlides.length) % bannerSlides.length);
	const next = () => setCurrent((i) => (i + 1) % bannerSlides.length);

	return (
		<div className="relative w-full h-[480px] group overflow-hidden">
			{/* Image */}
			<img
				src={bannerSlides[current].image}
				alt={bannerSlides[current].alt}
				className="w-full h-full object-cover transition-all duration-700 ease-in-out transform scale-100 group-hover:scale-[1.01]"
			/>

			<div className="" />

			{/* Button Prev */}
			<button
				onClick={prev}
				className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center text-xl backdrop-blur-md transition-all cursor-pointer select-none opacity-80 hover:opacity-100"
			>
				‹
			</button>

			{/* Button Next */}
			<button
				onClick={next}
				className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center text-xl backdrop-blur-md transition-all cursor-pointer select-none opacity-80 hover:opacity-100"
			>
				›
			</button>
		</div>
	);
}

export default Carousel;
