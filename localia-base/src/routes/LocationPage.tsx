import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "../components/authentication/AuthShell";


import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import Footer from "../components/layout/Footer";
import Profile from "../components/profile/Profile";
import BusinessLocationMap from "../components/ui/BusinessLocationMap";
import type { LocalBusiness } from "../types/localBusiness";

type AuthView = "login" | "register";

interface LocationSearch {
	category?: string;
}

function LocationPage() {

    const { category } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    
const [open, setOpen] = useState(false);
    const [view, setView] = useState<AuthView>("login");

    const openAs = (v: AuthView) => {
        setView(v);
        setOpen(true);
    };

    const handleCategoryChange = (newCategory: string | undefined) => {
	navigate({
		search: (prev: LocationSearch): LocationSearch => ({
			...prev,
			category: newCategory,
		}),
	});
};


    const business: LocalBusiness = {
        id: "1",
        name: "Comidas rápidas",
        location: "Puntarenas, Costa Rica",
        latitude: 9.9281,
        longitude: -85.0907,
        description: "Comida rápida deliciosa.",
        image_url: "/img/hogar.jpg",
        rating: 4.5,
        category: "Restaurante"
    };


    return (
        <div className="flex flex-col gap-20">
            <NavBar />
            
        <div className="flex flex-col gap-3 max-w-[1150px] mx-auto relative z-10">

            <SearchBar
            placeholder="Search businesses..."
            />
            
            <CategoryFilter value={category} onChange={handleCategoryChange} />
        </div>

      <Profile
        businessName={name ?? "Business"}
        subtitle="Profile"
        avatarUrl="/img/hogar.jpg"
        onEditClick={() => alert("Editar perfil")}
      />

      <BusinessLocationMap
        latitude={lat}
        longitude={lng}
        location={location}
      />

      <Footer />

      <AuthModal
        show={open}
        onClose={() => setOpen(false)}
        initialView={view}
      />
    </div>
  );
}


export const Route = createFileRoute("/LocationPage")({
	validateSearch: (search: Record<string, unknown>): LocationSearch => ({
		category: (search.category as string) || undefined,
	}),

	component: LocationPage,
});