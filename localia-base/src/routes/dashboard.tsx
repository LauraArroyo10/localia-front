import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AuthModal } from "../components/authentication/AuthShell";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import ProfilePage from "../components/layout/ProfilePage";
import ProductSection from "../components/sections/ProductsSection";
import ReviewsSection from "../components/sections/ReviewSection";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";
import { useAuth } from "../hooks/useAuth";

type AuthView = "login" | "register";

// TEMPORAL: id real de "Restaurante El Cacao" sacado de Neon, solo para probar reviews.
// Cuando tengas la página de detalle de negocio real, este id debe venir de ahí.
const TEMP_BUSINESS_ID = "283e5221-4bb6-424c-b90d-adc4faa05436";

function DashboardPage() {
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");
	const { user } = useAuth();

	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	return (
		<main className="min-h-screen flex flex-col bg-color-bg">
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			<section className="flex-1 p-4">
				<div className="flex flex-col gap-3 max-w-5xl mx-auto relative z-10">
					
					<SearchBar placeholder="Search businesses..." width="w-full" />
					<CategoryFilter />
					<ProfilePage />
					

					{user?.role === "seller" && (
						<>
							<ProductSection />
							<div className="mt-6">
								<ReviewsSection userRole="seller" businessId={TEMP_BUSINESS_ID} />
							</div>
						</>
					)}
				</div>
			</section>

			<Footer />

			<AuthModal
				show={open}
				onClose={() => setOpen(false)}
				initialView={view}
			/>
		</main>
	);
}

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});