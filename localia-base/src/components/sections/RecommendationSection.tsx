import BusinessCard from "../cards/BusinessCard";
import { mockBusinesses } from "../../mockData/mockBusinesses";

function RecommendationSection() {
  const handleViewMore = (id: number) => {
    console.log("Ver más", id);
  };

  return (
    <div className="w-full bg-terracota-400 py-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        <h2 className="text-4xl text-violet-50 text-center font-bold">
          You may also like...
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
          {mockBusinesses.slice(0, 4).map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onViewMore={handleViewMore}
               size="small"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendationSection;