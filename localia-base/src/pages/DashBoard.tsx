import { mockReviews } from "../mockData/reviews";
import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import ReviewsSection from "../components/sections/ReviewSection";
import { AuthModal } from "../components/authentication/AuthShell";

type AuthView = "login" | "register";

export default function DashBoard() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

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

      <section className="p-4">
        <div className="flex flex-col gap-3 max-w-5xl mx-auto relative z-10">
          <SearchBar placeholder="Search businesses..." width="w-full" />
          <CategoryFilter />

          <div className="mt-6">
            <ReviewsSection userRole="tourist" comments={mockReviews} />
          </div>
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