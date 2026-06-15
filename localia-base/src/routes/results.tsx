import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AuthModal } from "../components/authentication/AuthShell";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import BusinessSection from "../components/sections/BusinessSection";
import RecommendationSection from "../components/sections/RecommendationSection";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";

type AuthView = "login" | "register";

function ResultsPage() {
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");

	const openAs = (v: AuthView) => {
		setView(v);
		setOpen(true);
	};

	return (
		<div className="min-h-screen flex flex-col gap-20 bg-color-bg">
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

			<h1 className="text-4xl text-terracota-400 text-center font-bold">
				Results for: "Tacos de birria"
			</h1>

			{/* BUSINESSES */}
			<BusinessSection />

			{/* RECOMMENDATIONS + FOOTER */}
			<div className="flex flex-col">
				<RecommendationSection />
				<Footer />
			</div>

			{/* AUTH MODAL */}
			<AuthModal
				show={open}
				onClose={() => setOpen(false)}
				initialView={view}
			/>
		</div>
	);
}

export const Route = createFileRoute("/results")({
	component: ResultsPage,
});
