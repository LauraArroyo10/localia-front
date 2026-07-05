import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";
import { useNearbyBusinesses } from "../../hooks/useResults";
import { useUserLocation } from "../../hooks/useUserLocation";
import RecommendationCard from "../cards/RecommendationCard";

function RecommendationSection() {
	const [page, setPage] = useState(1);
	const { lat, lng } = useUserLocation();
	const { businesses, loading, error } = useNearbyBusinesses(lat, lng, 4, page);
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			toast.error("No se pudieron cargar las recomendaciones.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
		}
	}, [error]);

	const handleViewMore = (id: string) => {
		navigate({ to: "/business", search: { id } });
	};

	const handleNext = () => {
		if (businesses.length < 4) {
			setPage(1);
		} else {
			setPage((prev) => prev + 1);
		}
	};

	if (loading) {
		return (
			<div className="w-full bg-terracota-400 py-28">
				<p className="text-center text-violet-50">Loading recommendations...</p>
			</div>
		);
	}

	if (error) {
		return null;
	}

	if (businesses.length === 0) {
		return null;
	}

	return (
		<div className="w-full bg-terracota-400 py-28">
			<div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
				<h2 className="text-4xl text-violet-50 text-center font-bold">
					You may also like...
				</h2>

				<div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
					{businesses.slice(0, 4).map((business) => (
						<RecommendationCard
							key={business.id}
							business={business}
							onViewMore={handleViewMore}
						/>
					))}
				</div>

				<div className="flex justify-end mt-6">
					<button
						type="button"
						onClick={handleNext}
						aria-label="Next recommendations"
						className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-neutral-0 hover:opacity-90 transition-opacity cursor-pointer"
					>
						<FaArrowRight size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default RecommendationSection;
