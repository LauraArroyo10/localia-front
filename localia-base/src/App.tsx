import NavBar from './components/layout/NavBar';
import Header from './components/layout/Header';
import TopDestinations from './components/layout/topdestinations';
import BrowseInterest from './components/layout/BrowseInterest';
import SubscribeBanner from './components/layout/SuscribeBanner';
import Footer from './components/layout/Footer';
import { useState } from "react";
import { AuthModal } from './components/AuthShell';


type AuthView = "login" | "register";

function App() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

  const openAs = (v: AuthView) => { setView(v); setOpen(true); };

  return (
    <>
      <NavBar
        onLoginClick={() => openAs("login")}
        onRegisterClick={() => openAs("register")}
      />
      <Header />
      <TopDestinations />
      <BrowseInterest />
      <SubscribeBanner />
      <Footer />

      <AuthModal
        show={open}
        onClose={() => setOpen(false)}
        initialView={view}
      />
    </>
  );
}

export default App;