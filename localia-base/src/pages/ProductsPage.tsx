import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Footer from "../components/layout/Footer";
import Profile from "../components/profile/Profile";
import ProductGallery from "../components/ui/ProductGallery";


import type { Product } from "../types/product";


function ProductsPage() {
    const products: Product[] = [
    {
        id: 1,
        image: "/img/hamburguesas.jpg",
        name: "Hamburguesa",
        description: "",
        price: 1000
    },
    {
        id: 2,
        image: "/img/tacos.jpg",
        name: "Tacos",
        description: "",
        price: 0
        },
    {
        id: 3,
        image: "/img/hamburguesas.jpg",
        name: "Hamburguesa",
        description: "",
        price: 1000
    },
    {
        id: 4,
        image: "/img/tacos.jpg",
        name: "Tacos",
        description: "",
        price: 0
        },
    {
        id: 5,
        image: "/img/hamburguesas.jpg",
        name: "Hamburguesa",
        description: "",
        price: 1000
    },
    {
        id: 6,
        image: "/img/tacos.jpg",
        name: "Tacos",
        description: "",
        price: 0
    }
];

    return (
        
        <div className="flex flex-col gap-20">
            <NavBar />
            
        <div className="flex flex-col gap-3 w-full max-w-[1150px] mx-auto relative z-10">

            <SearchBar
            placeholder="Search businesses..."
            />
            
                <CategoryFilter />
                </div>

            <Profile
            businessName="Comidas rápidas"
            subtitle="Profile"
            avatarUrl="/img/hogar.jpg"
                onEditClick={() => alert("Editar perfil")} />
            
                <ProductGallery products={products} />
                
            
                <Footer />
                </div>

    )
};

export default ProductsPage;
