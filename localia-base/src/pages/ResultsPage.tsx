import NavBar from "../components/layout/NavBar";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import BusinessSection from "../components/sections/BusinessSection";
import RecommendationSection from "../components/sections/RecommendationSection";
import Footer from "../components/layout/Footer";

function ResultsPage() {
    return (
    <div className="flex flex-col gap-20">

        <NavBar />

        <div className="flex flex-col gap-5">

            <SearchBar
                placeholder="Search businesses..."
                width="w-300"
            />

            <div className="w-full flex justify-start pl-88">
                <CategoryFilter />
            </div>

            </div>

            <h1 className="text-4xl text-terracota-400 text-center font-bold">
                Results for: "Tacos de birria"
            </h1>

        <BusinessSection />

        <div className="flex flex-col">
            <RecommendationSection />
            <Footer />
        </div>

    </div>
);
    
}

export default ResultsPage;