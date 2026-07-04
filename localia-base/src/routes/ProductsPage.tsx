import { createFileRoute } from "@tanstack/react-router";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import AllProductsSection from "../components/sections/AllProductsSection";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";


function ProductsPage() {
	const { businessId } = Route.useSearch();


	if (!businessId) {
		return (
			<div className="text-center mt-10">
				No business selected
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-20">
			<NavBar />

			<div className="flex flex-col gap-3 w-full max-w-[1150px] mx-auto relative z-10">
				<SearchBar placeholder="Search businesses..." />
				<CategoryFilter />
			</div>

			<Profile
				businessName="Comidas rápidas"
				subtitle="Profile"
				avatarUrl="/img/hogar.jpg"
				onEditClick={() => alert("Editar perfil")}
			/>

			<AllProductsSection businessId={businessId} />

			<Footer />


		</div>
	);
}

export const Route = createFileRoute("/ProductsPage")({
	component: ProductsPage,
});