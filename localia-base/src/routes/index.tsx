import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AuthModal } from "../components/authentication/AuthShell";
import BrowseInterest from "../components/layout/BrowseInterestCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import SubscribeBanner from "../components/layout/SuscribeBanner";
import TopDestinations from "../components/layout/TopdestinationsCard";

type AuthView = "login" | "register";

function HomePage() {
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");

	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	return (
		<main className="min-h-screen flex flex-col bg-color-bg">
			{/* NAVBAR */}
			<NavBar
				onLoginClick={() => openAs("login")}
				onRegisterClick={() => openAs("register")}
			/>

			{/* HERO */}
			<Header />

			{/* DESTINATIONS */}
			<TopDestinations />

			{/* INTERESTS */}
			<BrowseInterest />

			{/* SUBSCRIBE */}
			<SubscribeBanner />

			{/* FOOTER */}
			<Footer />

			{/* AUTH MODAL */}
			<AuthModal
				show={open}
				onClose={() => setOpen(false)}
				initialView={view}
			/>
		</main>
	);
}

export const Route = createFileRoute("/")({
	component: HomePage,
});
