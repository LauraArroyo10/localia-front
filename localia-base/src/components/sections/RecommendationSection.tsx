import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";
import { useNearbyBusinesses } from "../../hooks/useResults";
import { useUserLocation } from "../../hooks/useUserLocation";
import type { LocalBusiness } from "../../types/localBusiness";
import RecommendationCard from "../cards/RecommendationCard";

function RecommendationSection() {
	const navigate = useNavigate();
	const { lat, lng } = useUserLocation();
	const { businesses, loading, error } = useNearbyBusinesses(lat, lng, 20, 1);

	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (error) {
			toast.error("No se pudieron cargar las recomendaciones.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
		}
	}, [error]);

	const handleViewMore = (id: string) => {
		navigate({ to: `/business/${id}` });
	};

	if (!loading && (error || businesses.length === 0)) {
		return null;
	}

	const data = (businesses as LocalBusiness[]).slice(0, 20);
	const visibleCards = 4;

	const next = () => {
		if (index < data.length - visibleCards) {
			setIndex(index + 1);
		}
	};

	const prev = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};

	return (
		<div className="w-full bg-terracota-400 py-28">
			<div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
				<h2 className="text-4xl text-violet-50 text-center font-bold">
					You may also like...
				</h2>

				<div className="flex items-center gap-4 w-full">
					<button
						type="button"
						onClick={prev}
						aria-label="Previous recommendations"
						className="text-neutral-0 bg-violet-900 rounded-2xl text-3xl font-bold px-3 select-none cursor-pointer hover:bg-violet-700 transition flex-shrink-0"
					>
						{"<"}
					</button>

					<div className="overflow-hidden w-full">
						<div
							className="flex gap-6 transition-transform duration-300 ease-in-out"
							style={{
								transform: `translateX(-${index * 286}px)`,
							}}
						>
							{loading
								? Array(20).fill(null).map((_, i) => (
										<div
											key={i}
											className="w-[260px] h-[380px] rounded-3xl bg-neutral-200 animate-pulse flex-shrink-0"
										/>
								  ))
								  
								: data.map((business) => (
										<div
											key={business.id}
											className="w-[260px] h-[380px] flex-shrink-0"
										>
											<RecommendationCard
												business={business}
												onViewMore={handleViewMore}
											/>
										</div>
								  ))}
						</div>
					</div>

					<button
						type="button"
						onClick={next}
						aria-label="Next recommendations"
						className="text-neutral-0 bg-violet-900 rounded-2xl text-3xl font-bold px-3 select-none cursor-pointer hover:bg-violet-700 transition flex-shrink-0"
					>
						{">"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default RecommendationSection;