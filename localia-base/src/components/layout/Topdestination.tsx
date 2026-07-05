import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useNearbyBusinesses } from "../../hooks/useResults";
import { useUserLocation } from "../../hooks/useUserLocation";
import TopDestinationCard from "../cards/TopDestinationCard";
import type { LocalBusiness } from "../../types/localBusiness";

function TopDestinations() {
	const navigate = useNavigate();
	const { lat, lng } = useUserLocation();
	const { businesses, loading, error } = useNearbyBusinesses(lat, lng, 100, 1);

	const [index, setIndex] = useState(0);

	const handleViewMore = (id: string) => {
		navigate({ to: "/Dashboard", params: { id } });
	};

	if (!loading && (error || businesses.length === 0)) {
		return null;
	}

	const data = (businesses as LocalBusiness[]).slice(0, 10);
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
		<section className="w-full py-16 px-6 flex flex-col items-center">
			<div className="w-full max-w-[1150px]">

				<div className="flex justify-between items-center mb-10">
					<h2 className="text-3xl font-bold text-violet-900">
						Top destinations near you
					</h2>

					<button
						onClick={() => navigate({ to: "/results" })}
						className="px-6 py-3 bg-accent text-violet-900 rounded-full font-semibold hover:bg-accent-100 transition-all text-sm"
					>
						Find more places
					</button>
				</div>

				<div className="flex items-center gap-4 w-full">

					<button
						onClick={prev}
						className="text-neutral-0 bg-violet-900 rounded-2xl text-3xl font-bold px-3 select-none cursor-pointer hover:bg-violet-700 transition"
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
								? Array(10).fill(null).map((_, i) => (
										<div
											key={i}
											className="w-[260px] h-96 rounded-3xl bg-neutral-200 animate-pulse flex-shrink-0"
										/>
								  ))
								: data.map((business) => (
										<div
											key={business.id}
											className="w-[260px] flex-shrink-0"
										>
											<TopDestinationCard
												business={business}
												onViewMore={handleViewMore}
											/>
										</div>
								  ))}
						</div>
					</div>

					<button
						onClick={next}
						className="text-neutral-0 bg-violet-900 rounded-2xl text-3xl font-bold px-3 select-none cursor-pointer hover:bg-violet-700 transition"
					>
						{">"}
					</button>

				</div>
			</div>
		</section>
	);
}

export default TopDestinations;