
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "../components/authentication/AuthShell";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import BusinessLocationMap from "../components/ui/BusinessLocationMap";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";
type AuthView = "login" | "register";
function LocationPage() {
	/**
	 * Controla la apertura del modal de autenticación.
	 */
	const [open, setOpen] = useState(false);
	/**
	 * Mantiene el filtro de categoría seleccionado en la vista.
	 */
	const [category, setCategory] = useState<string | undefined>(undefined);

	/**
	 * Lee los parámetros de búsqueda de la URL para centrar el mapa y mostrar el perfil.
	 */
	const { lat, lng, location, name } = Route.useSearch();

	return (
		<div className="flex flex-col gap-20">
			<NavBar />

			<div className="flex flex-col gap-3 max-w-6xl mx-auto relative z-10">
				<SearchBar placeholder="Search businesses..." />
				<CategoryFilter value={category} onChange={setCategory} />
			</div>

			<Profile
				businessName={name ?? "Business"}
				subtitle="Profile"
				avatarUrl="/img/hogar.jpg"
				onEditClick={() => alert("Editar perfil")}
			/>

			<BusinessLocationMap latitude={lat} longitude={lng} location={location} />

			<Footer />

			<AuthModal
				show={open}
				onClose={() => setOpen(false)}
				initialView={"login" as AuthView}
			/>
		</div>
	);
}

export const Route = createFileRoute("/LocationPage")({
	component: LocationPage,
	/**
	 * Valida los parámetros de búsqueda y devuelve valores por defecto cuando faltan.
	 */
	validateSearch: (search: any) => {
		const lat = Number(search.lat);
		const lng = Number(search.lng);

		return {
			lat: Number.isFinite(lat) ? lat : 9.9281,
			lng: Number.isFinite(lng) ? lng : -84.0907,
			location: search.location ?? "",
			name: search.name ?? "",
		};
	},
});

