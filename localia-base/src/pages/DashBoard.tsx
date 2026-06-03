

import { mockReviews } from "../mockData/reviews";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import ReviewsSection from "../components/sections/ReviewSection";

export default function DashBoard() {
  return (
    <main
    className="
      min-h-screen
      flex
      flex-col
      gap-20
      bg-color-bg
    "
  >
      <NavBar />

      <section className="p-4">
         <div className="flex flex-col gap-3 w-300 mx-auto relative z-10">
            
        
         <SearchBar
          placeholder="Search businesses..."
          width="w-300"
        />

          <CategoryFilter />

        <div className="mt-6">
          <ReviewsSection
  comments={mockReviews}
  userRole="guest"
/>
 </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}