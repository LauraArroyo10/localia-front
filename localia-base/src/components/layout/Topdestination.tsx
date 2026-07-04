import { useNavigate } from "@tanstack/react-router";
import { useNearbyBusinesses } from "../../hooks/useResults";
import { useUserLocation } from "../../hooks/useUserLocation";
import TopDestinationCard from "../cards/TopDestinationCard";
import type { LocalBusiness } from "../../types/localBusiness";

function TopDestinations() {
	const navigate = useNavigate();
	const { lat, lng } = useUserLocation();
	const { businesses, loading, error } = useNearbyBusinesses(lat, lng, 100, 1);

	if (!loading && (error || businesses.length === 0)) {
		return null;
	}

	const handleViewMore = (id: string) => {
		navigate({ to: "/dashboard", params: { id } });
	};

	return (
		<section className="w-full py-16 px-6 flex flex-col items-center">
			<div className="w-full max-w-[1150px]">

				<div className="flex justify-between items-center mb-10 w-full max-w-[1200px]">
					<h2 className="text-3xl font-bold text-violet-900">
						Top destinations near you
					</h2>

					<button
						onClick={() => navigate({ to: "/results" })}
						className="px-6 py-3 bg-accent text-violet-900 rounded-full font-semibold hover:bg-accent-100 transition-all cursor-pointer text-sm"
					>
						Find more places
					</button>
				</div>

				<div className="relative flex gap-6 overflow-x-auto pb-4 scrollbar-none w-full">

					{loading
						? Array(4).fill(null).map((_, index) => (
								<div
									key={index}
									className="flex-1 min-w-[260px] h-96 rounded-3xl bg-neutral-200 animate-pulse"
								/>
						  ))
						: (businesses as LocalBusiness[])
							.slice(0, 4)
							.map((business) => (
								<TopDestinationCard
									key={business.id}
									business={business}
									onViewMore={handleViewMore}
								/>
						  ))}
				</div>
			</div>
		</section>
	);
}

export default TopDestinations;