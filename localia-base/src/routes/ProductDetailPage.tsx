import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "../components/authentication/AuthShell";




import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Footer from "../components/layout/Footer";
import Profile from "../components/profile/Profile";
import ProductInformation from "../components/ui/ProductInformation";


import type { Product } from "../types/product";

type AuthView = "login" | "register";


function ProductDetailPage() {


const [open, setOpen] = useState(false);
    const [view, setView] = useState<AuthView>("login");
const { id } = Route.useSearch();
    const openAs = (v: AuthView) => {
        setView(v);
        setOpen(true);
    };

const product:Product={
    id
}
    // const product: Product = {
    // id: 1,
    // image: "/img/hamburguesas.jpg",
    // name: "Hamburguesa especial",
    // description: "Hamburguesa con carne, queso, lechuga y salsa de la casa.",
    // price: 10
    // };

    return (
        
        <div className="flex flex-col gap-20">
             {/* NAVBAR */}
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			{/* SEARCH AREA */}
			<div className="flex flex-col gap-3 max-w-5xl mx-auto relative z-10">
				<SearchBar placeholder="Search businesses..." width="w-300" />
				<CategoryFilter />
			</div>

            <Profile
            businessName="Comidas rápidas"
            subtitle="Profile"
            avatarUrl="/img/hogar.jpg"
                onEditClick={() => alert("Editar perfil")} />
            
            <ProductInformation product={product}/>
            
                <div className="flex flex-col">
				<Footer />
			</div>

			{/* AUTH MODAL */}
			<AuthModal
				show={open}
				onClose={() => setOpen(false)}
				initialView={view}
			/>
                </div>

    )
};


export const Route = createFileRoute("/ProductDetailPage")({
    component: ProductDetailPage,
    validateSearch: (search) => ({
        id: Number(search.id) || 0,
    }),

});