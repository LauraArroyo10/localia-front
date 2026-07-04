// import { useEffect } from "react";
// import { toast } from "sonner";
// import { useNearbyBusinesses } from "../../hooks/useResults";
// import { useUserLocation } from "../../hooks/useUserLocation";
// import BusinessCard from "../cards/BusinessCard";

// function BusinessSection() {
// 	const { lat, lng } = useUserLocation();
// 	const { businesses, loading, error } = useNearbyBusinesses(lat, lng, 10, 1);

// 	useEffect(() => {
// 		if (error) {
// 			toast.error("No se pudieron cargar los negocios.", {
// 				style: { background: "#ab0000", color: "#ffffff" },
// 			});
// 		}
// 	}, [error]);

// 	const handleViewMore = (id: string) => {
// 		console.log("Ver más", id);
// 	};

// 	if (loading) return <p>Cargando...</p>;
// 	if (error) return null;

// 	return (
// 		<div className="max-w-7xl mx-auto px-6">
// 			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">

// 				{businesses.map((business) => (
// 					<BusinessCard
// 						key={business.id}
// 						business={business}
// 						onViewMore={handleViewMore}
// 					/>
// 				))}

// 			</div>
// 		</div>
// 	);
// }

// export default BusinessSection;



import { useEffect } from "react";
import { toast } from "sonner";
import { useNearbyBusinesses } from "../../hooks/useResults";
import { useUserLocation } from "../../hooks/useUserLocation";
import BusinessCard from "../cards/BusinessCard";

interface BusinessSectionProps {
	category?: string;
}

function BusinessSection({ category }: BusinessSectionProps) {
	const { lat, lng } = useUserLocation();
	const { businesses, loading, error } = useNearbyBusinesses(lat, lng, 10, 1, category);

	useEffect(() => {
		if (error) {
			toast.error("No se pudieron cargar los negocios.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
		}
	}, [error]);

	const handleViewMore = (id: string) => {
		console.log("Ver más", id);
	};

	if (loading) return <p>Cargando...</p>;
	if (error) return null;

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