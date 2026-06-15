import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Footer from "../components/layout/Footer";
import Profile from "../components/profile/Profile";
import ProductInformation from "../components/ui/ProductInformation";


import type { Product } from "../types/product";


function ProductDetailPage() {
    const product: Product = {
    id: 1,
    image: "/img/hamburguesas.jpg",
    name: "Hamburguesa especial",
    description: "Hamburguesa con carne, queso, lechuga y salsa de la casa.",
    price: 10
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
            
            <ProductInformation product={product}/>
            
                <Footer />
                </div>

    )
};

export default ProductDetailPage;
