import './App.css'
import NavBar from './components/layout/NavBar';
import Header from './components/layout/Header';
import TopDestinations from './components/layout/topdestinations';
import BrowseInterest from './components/layout/BrowseInterest';
import SubscribeBanner from './components/layout/SuscribeBanner';
import Footer from './components/layout/Footer';
import ResultsPage from './pages/ResultsPage';
function App() {


  return (
    <div >
      <ResultsPage />
      
<NavBar />
      <Header />
      <TopDestinations />
      <BrowseInterest />
      <SubscribeBanner />
<Footer/>
    </div>
  )
}

export default App
