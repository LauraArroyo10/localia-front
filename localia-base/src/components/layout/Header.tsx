
import Carousel from "./HomeCarousel";
import SearchBar from "../ui/SearchBar";
function Header() {
  return (
    <div>
      <header
        className=" 
      px-11.25 py-15 flex flex-col items-center 
      gap-6"
      >
        {/* Main title */}
        <h1
          className="text-terracota-500 text-5xl 
        font-medium"
        >
          Need a place to go nearby?
        </h1>

        {/* Categories */}
        {/* <CategoryFilter /> */}

        {/* Main searchbar */}
        <SearchBar width="w-full max-w-2xl" placeholder="¿What would you love to discover today?"/>

        {/* carousel */}
        <Carousel/>

      </header>
    </div>
  );
}

export default Header;
