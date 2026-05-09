import Searchbar from "../ui/SearchBar";
import Carousel from "./HomeCarousel";

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
        {/* <Searchbar /> */}

        {/* carousel */}
        <Carousel/>

      </header>
    </div>
  );
}

export default Header;
