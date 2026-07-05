import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "../components/authentication/AuthShell";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import ProfileView from "../components/profile/ProfileViewCard";
import AllProductsSection from "../components/sections/AllProductsSection";
import ReviewsSection from "../components/sections/ReviewSection";
import { useBusinessDetail } from "../hooks/useBusinessDetail";

type AuthView = "login" | "register";

const destinationImg = "/img/destination-placeholder.jpg";

function BusinessDetailPage() {
	const { id } = Route.useParams();
	const { business, loading, error } = useBusinessDetail(id);

	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");

	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	if (loading) {
		return (
			<main className="min-h-screen flex flex-col gap-20 bg-color-bg">
				<NavBar
					onLoginClick={() => openAs("login")}
					onRegisterClick={() => openAs("register")}
				/>
				<p className="text-center mt-10">Cargando...</p>
			</main>
		);
	}

	if (error || !business) {
		return (
			<main className="min-h-screen flex flex-col gap-20 bg-color-bg">
				<NavBar
					onLoginClick={() => openAs("login")}
					onRegisterClick={() => openAs("register")}
				/>
				<p className="text-center mt-10">No se pudo cargar el negocio.</p>
			</main>
		);
	}

	return (
		<main className="min-h-screen flex flex-col gap-20 bg-color-bg">
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			<section>
				<div className="flex flex-col gap-3 max-w-[1150px] mx-auto relative z-10">
					<ProfileView
						data={{
							businessName: business.name,
							subtitle: business.category,
							avatarUrl: business.image_url ?? "/img/hogar.jpg",
							bannerImgUrl: business.image_url ?? destinationImg,
							description: business.description ?? "",
							location: business.city ?? "",
							rating: business.avgRating,
							lat: business.lat ? Number(business.lat) : undefined,
							lng: business.lng ? Number(business.lng) : undefined,
						}}
						showFavoritesButton={false}
					/>

					<AllProductsSection
						businessId={business.id}
						showOwnerControls={false}
					/>

					<div className="mt-6">
						<ReviewsSection userRole="tourist" businessId={business.id} />
					</div>
				</div>
			</section>

			<Footer />

			<AuthModal show={open} onClose={() => setOpen(false)} initialView={view} />
		</main>
	);
}

export const Route = createFileRoute("/business/$id")({
	component: BusinessDetailPage,
});