import { useNearbyBusinesses } from "../../hooks/useResults";
import BusinessCard from "../cards/BusinessCard";

function BusinessSection() {
	const { businesses, loading, error } = useNearbyBusinesses(10, 1);

	const handleViewMore = (id: string) => {
		console.log("Ver más", id);
	};

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="max-w-7xl mx-auto px-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">

				{businesses.map((business) => (
					<BusinessCard
						key={business.id}
						business={business}
						onViewMore={handleViewMore}
					/>
				))}

			</div>
		</div>
	);
}

export default BusinessSection;