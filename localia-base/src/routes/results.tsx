import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthModal } from "../components/authentication/AuthShell";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import BusinessSection from "../components/sections/BusinessSection";
import RecommendationSection from "../components/sections/RecommendationSection";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";

type AuthView = "login" | "register";

interface ResultsSearch {
	category?: string;
}

function ResultsPage() {
	/**
	 * Controla el modal de autenticación en la vista de resultados.
	 */
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");
	const { category } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	/**
	 * Abre el modal con la vista adecuada según la acción elegida.
	 */
	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	/**
	 * Actualiza la categoría seleccionada en la ruta para filtrar los resultados.
	 */
	const handleCategoryChange = (newCategory: string | undefined) => {
		navigate({
			search: (prev: ResultsSearch): ResultsSearch => ({
				...prev,
				category: newCategory,
			}),
		});
	};

	return (
		<div className="min-h-screen flex flex-col gap-20 bg-color-bg">
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			<div className="flex flex-col gap-3 max-w-6xl mx-auto relative z-10">
				<SearchBar placeholder="Search businesses..." />
				<CategoryFilter value={category} onChange={handleCategoryChange} />
			</div>

			<h1 className="text-4xl text-terracota-400 text-center font-bold">
				{category ? `Results for: "${category}"` : "All results"}
			</h1>

			<BusinessSection category={category} />

			<div className="flex flex-col">
				<RecommendationSection />
				<Footer />
			</div>

			<AuthModal
				show={open}
				onClose={() => setOpen(false)}
				initialView={view}
			/>
		</div>
	);
}

export const Route = createFileRoute("/results")({
	/**
	 * Convierte el parámetro category de la URL en un filtro opcional.
	 */
	validateSearch: (search: Record<string, unknown>): ResultsSearch => ({
		category: (search.category as string) || undefined,
	}),

	component: ResultsPage,
});

