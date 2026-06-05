import { useState } from "react";

import NavBar from "../components/layout/NavBar";
import Header from "../components/layout/Header";
// import TopDestinations from "../components/layout/Topdestinations";
import BrowseInterest from "../components/layout/BrowseInterest";
import Footer from "../components/layout/Footer";
import { AuthModal } from "../components/authentication/AuthShell";
import SubscribeBanner from "../components/layout/SuscribeBanner";

type AuthView = "login" | "register";

function Home() {
  const [open, setOpen] = useState(false);

  const [view, setView] = useState<AuthView>("login");

  const openAs = (v: AuthView) => {
    setView(v);
    setOpen(true);
  };

  return (
    <main
      className="
      min-h-screen
      flex
      flex-col
      bg-color-bg
      
    "
    >
      {/* NAVBAR */}
      <NavBar
        onLoginClick={() => openAs("login")}
        onRegisterClick={() => openAs("register")}
      />

      {/* HERO */}
      <Header />

      {/* DESTINATIONS */}
      {/* <TopDestinations /> */}

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

export default Home;
