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

function DashboardPage() {
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");
	const { user } = useAuth();
	const businessId = user?.business?.id;

	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	return (
		<main className="min-h-screen flex flex-col gap-20 bg-color-bg">
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			<section>
				<div className="flex flex-col gap-3 max-w-[1150px] mx-auto relative z-10">
					<SearchBar placeholder="Search businesses..." />
					<CategoryFilter />
					<ProfilePage />

					{user?.role === "seller" && businessId && (
						<>
							<ProductSection businessId={businessId} />

							<div className="mt-6">
								<ReviewsSection
									userRole="seller"
									businessId={businessId}
								/>
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

export const Route = createFileRoute("/Dashboard")({
	component: DashboardPage,
});