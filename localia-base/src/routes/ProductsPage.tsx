import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "../components/authentication/AuthShell";




import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Footer from "../components/layout/Footer";
import Profile from "../components/profile/Profile";
import ProductGallery from "../components/ui/ProductGallery";


import type { Product } from "../types/product";
type AuthView = "login" | "register";

function ProductsPage() {


const [open, setOpen] = useState(false);
    const [view, setView] = useState<AuthView>("login");

    const openAs = (v: AuthView) => {
        setView(v);
        setOpen(true);
    };



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
            
                <ProductGallery products={products} />
                
            
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


export const Route = createFileRoute("/ProductsPage")({
    component: ProductsPage,
});