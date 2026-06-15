import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Footer from "../components/layout/Footer";
import Profile from "../components/profile/Profile";
import BusinessLocationMap from "../components/ui/BusinessLocationMap";
import type { LocalBusiness } from "../types/localBusiness";


function LocationPage() {

    const business: LocalBusiness = {
        id: 1,
        name: "Comidas rápidas",
        location: "Puntarenas, Costa Rica",
        latitude: 9.9281,
        longitude: -85.0907,
        description: "Comida rápida deliciosa.",
        image: "/img/hogar.jpg",
        rating: 4.5,
        category: "Restaurante"
    };


    return (
        <div className="flex flex-col gap-20">
            <NavBar />
            
        <div className="flex flex-col gap-3 max-w-5xl mx-auto relative z-10">

            <SearchBar
            placeholder="Search businesses..."
            width="w-300" />
            
            <CategoryFilter />
        </div>

            <Profile
            businessName="Comidas rápidas"
            subtitle="Profile"
            avatarUrl="/img/hogar.jpg"
                onEditClick={() => alert("Editar perfil")} />
            
        <div className="flex flex-col gap-20">

            <BusinessLocationMap
                latitude={business.latitude}
                longitude={business.longitude}
                location={business.location}
            />

        </div>
                
            
                <Footer />
                </div>
        
    );
}


export default LocationPage;