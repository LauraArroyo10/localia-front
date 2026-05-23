import BusinessCard from "../cards/BusinessCard";
import type { LocalBusiness } from "../../types/localBusiness";

function BusinessSection() {
    const businesses: LocalBusiness[] = [

        {
        
        id: 1,
        name: "Cafe Central",
        location: "San José",
        description: "Un lugar tranquilo con excelente café artesanal y ambiente relajado.",
        image: "/img/hogar.jpg",
        rating: 4.5,
        category: "Cafe",
        },
        {
        id: 2,
        name: "Pizza House",
        location: "Heredia",
        description: "Pizzas artesanales con ingredientes frescos y masa crujiente.",
        image: "/img/pizzeria.jpg",
        rating: 4.2,
        category: "Restaurant",
        },
        {
        id: 3,
        name: "Sushi Sakura",
        location: "Escazú",
        description: "Sushi fresco preparado al momento con recetas japonesas auténticas.",
        image: "/img/sushi.jpg",
        rating: 4.8,
        category: "Restaurant",
        },
        {
        id: 4,
        name: "Burger Lab",
        location: "Alajuela",
        description: "Hamburguesas gourmet con combinaciones únicas y mucho sabor.",
        image: "/img/hamburguesas.jpg",
        rating: 4.3,
        category: "Fast Food",
        },
        {
        id: 5,
        name: "Green Smoothie Bar",
        location: "San Pedro",
        description: "Batidos naturales, saludables y llenos de energía.",
        image: "/img/batidos.jpg",
        rating: 4.6,
        category: "Healthy",
        },
        {
        id: 6,
        name: "Taco Fiesta",
        location: "Cartago",
        description: "Tacos auténticos mexicanos con sabores intensos y caseros.",
        image: "/img/tacos.jpg",
        rating: 4.4,
        category: "Restaurant",
        },
    
    ];

    const handleViewMore = (id: number) => {
        console.log("Ver más", id)
    };

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
    )

    

    
}

export default BusinessSection;

