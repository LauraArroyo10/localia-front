import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "../components/authentication/AuthShell";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import AllProductsSection from "../components/sections/AllProductsSection";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";
import { useAuth } from "../hooks/useAuth";
import { useBusinessDetail } from "../hooks/useBusinessDetail";

type AuthView = "login" | "register";

interface ProductsSearch {
	category?: string;
	businessId?: string;
}

function ProductsPage() {
	/**
	 * Recupera el negocio y los filtros desde la ruta para montar la vista correcta.
	 */
	const { businessId, category } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { business, loading, error } = useBusinessDetail(businessId);
	const { user } = useAuth();

	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");

	/**
	 * Abre el modal de autenticación en la vista solicitada por el usuario.
	 */
	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	/**
	 * Mantiene el filtro de categoría sincronizado con la búsqueda activa.
	 */
	const handleCategoryChange = (newCategory: string | undefined) => {
		navigate({
			search: (prev: ProductsSearch): ProductsSearch => ({
				...prev,
				category: newCategory,
			}),
		});
	};

	if (!businessId) {
		return <div className="text-center mt-10">No business selected</div>;
	}

	if (loading) {
		return (
			<div className="flex flex-col gap-20">
				<NavBar
					onLoginClick={() => openAs("login")}
					onRegisterClick={() => openAs("register")}
				/>
				<p className="text-center mt-10">Cargando...</p>
			</div>
		);
	}

	if (error || !business) {
		return (
			<div className="flex flex-col gap-20">
				<NavBar
					onLoginClick={() => openAs("login")}
					onRegisterClick={() => openAs("register")}
				/>
				<p className="text-center mt-10">No se pudo cargar el negocio.</p>
			</div>
		);
	}

	const isOwner = user?.role === "seller" && user?.business?.id === business.id;

	return (
		<div className="flex flex-col gap-20">
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			<div className="flex flex-col gap-3 w-full max-w-6xl mx-auto relative z-10">
				<SearchBar placeholder="Search businesses..." />
				<CategoryFilter value={category} onChange={handleCategoryChange} />
			</div>

			<Profile
				businessName={business.name}
				subtitle={business.category}
				avatarUrl={business.image_url ?? "/img/hogar.jpg"}
				onEditClick={() => alert("Editar perfil")}
			/>

			<AllProductsSection businessId={businessId} showOwnerControls={isOwner} />

			<Footer />

			<AuthModal show={open} onClose={() => setOpen(false)} initialView={view} />
		</div>
	);
}

export const Route = createFileRoute("/ProductsPage")({
	/**
	 * Asegura que los parámetros de búsqueda de la URL sean strings opcionales.
	 */
	validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
		businessId: (search.businessId as string) || undefined,
		category: (search.category as string) || undefined,
	}),
	component: ProductsPage,
});
