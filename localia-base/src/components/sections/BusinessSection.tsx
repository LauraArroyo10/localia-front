import { mockBusinesses } from "../../mockData/mockBusinesses";
import BusinessCard from "../cards/BusinessCard";

function BusinessSection() {
	const handleViewMore = (id: number) => {
		console.log("Ver más", id);
	};

  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 " >
        {mockBusinesses.map((business) => (
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
