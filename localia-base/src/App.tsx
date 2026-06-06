import './App.css'
import NavBar from './components/layout/NavBar';
import Header from './components/layout/Header';
import TopDestinations from './components/layout/TopdestinationsCard';
import BrowseInterest from './components/layout/BrowseInterestCard';
import SubscribeBanner from './components/layout/SuscribeBanner';
import Footer from './components/layout/Footer';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from "./components/layout/ProfilePage";
function App() {


  return (
    <div >
      <ResultsPage />
      
<NavBar />
      <Header />
      <TopDestinations />
      <BrowseInterest />
      <SubscribeBanner />
      <ProfilePage />
<Footer/>

    </div>
  )
}

export default App
