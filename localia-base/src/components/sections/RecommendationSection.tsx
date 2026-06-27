import type { LocalBusiness } from "../../types/localBusiness";
import RecommendationCard from "../cards/RecommendationCard";

function RecommendationSection() {
  const businesses: LocalBusiness[] = [
    
      {
  id: 1,
  name: "Cafe Central",
  location: "San José",
  latitude: 9.9281,
  longitude: -84.0907,
  description:
    "Un lugar tranquilo con excelente café artesanal y ambiente relajado.",
  image: "/img/hogar.jpg",
  rating: 4.5,
  category: "Cafe",
},
{
  id: 2,
  name: "Pizza House",
  location: "Heredia",
  latitude: 10.0024,
  longitude: -84.1165,
  description:
    "Pizzas artesanales con ingredientes frescos y masa crujiente.",
  image: "/img/pizzeria.jpg",
  rating: 4.2,
  category: "Restaurant",
},
{
  id: 3,
  name: "Sushi Sakura",
  location: "Escazú",
  latitude: 9.9189,
  longitude: -84.1399,
  description:
    "Sushi fresco preparado al momento con recetas japonesas auténticas.",
  image: "/img/sushi.jpg",
  rating: 4.8,
  category: "Restaurant",
},
{
  id: 4,
  name: "Burger Lab",
  location: "Alajuela",
  latitude: 10.0163,
  longitude: -84.2144,
  description:
    "Hamburguesas gourmet con combinaciones únicas y mucho sabor.",
  image: "/img/hamburguesas.jpg",
  rating: 4.3,
  category: "Fast Food",
},
{
  id: 5,
  name: "Green Smoothie Bar",
  location: "San Pedro",
  latitude: 9.9347,
  longitude: -84.0515,
  description:
    "Batidos naturales, saludables y llenos de energía.",
  image: "/img/batidos.jpg",
  rating: 4.6,
  category: "Healthy",
},
{
  id: 6,
  name: "Taco Fiesta",
  location: "Cartago",
  latitude: 9.8644,
  longitude: -83.9194,
  description:
    "Tacos auténticos mexicanos con sabores intensos y caseros.",
  image: "/img/tacos.jpg",
  rating: 4.4,
  category: "Restaurant",
},
  ];

	const handleViewMore = (id: number) => {
		console.log("Ver más", id);
	};

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
			</div>
		</div>
	);
}

export default RecommendationSection;
