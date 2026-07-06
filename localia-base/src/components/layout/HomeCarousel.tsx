import { useState } from "react";

const destinationImg = "/img/destination-placeholder.jpg";
const foodImg = "/img/market.jpg";
const streetImg = "/img/street.jpg";
const locomotionImg = "/img/locomo.jpg";

export function Carousel() {
	const [current, setCurrent] = useState(0);

	/**
	 * Define las imágenes del carrusel de portada.
	 */
	const bannerSlides = [
		{ id: 1, image: destinationImg, alt: "Beautiful beach destination" },
		{ id: 2, image: foodImg, alt: "Delicius food" },
		{ id: 3, image: streetImg, alt: "Streets" },
		{ id: 4, image: locomotionImg, alt: "Steam locomotion" },
	];

	/**
	 * Muestra la imagen anterior del carrusel.
	 */
	const prev = () =>
		setCurrent((i) => (i - 1 + bannerSlides.length) % bannerSlides.length);
	/**
	 * Muestra la siguiente imagen del carrusel.
	 */
	const next = () => setCurrent((i) => (i + 1) % bannerSlides.length);

	return (
		<div className="relative w-full h-120 group overflow-hidden">
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
				className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-0/25 hover:bg-neutral-0/40 text-neutral-0 flex items-center justify-center text-xl backdrop-blur-md transition-all cursor-pointer select-none opacity-80 hover:opacity-100"
			>
				‹
			</button>

			{/* Button Next */}
			<button
				onClick={next}
				className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-0/25 hover:bg-neutral-0/40 text-neutral-0 flex items-center justify-center text-xl backdrop-blur-md transition-all cursor-pointer select-none opacity-80 hover:opacity-100"
			>
				›
			</button>
		</div>
	);
}

export default Carousel;
