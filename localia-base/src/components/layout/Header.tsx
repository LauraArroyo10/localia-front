import { useState } from "react";
import CategoryFilter from "../ui/CategoryFilter";
import SearchBar from "../ui/SearchBar";
import Carousel from "./HomeCarousel";

function Header() {
	const [activeTab, setActiveTab] = useState("service");

	return (
		<div className="w-full  flex flex-col items-center">
			<header className="w-full pt-16 pb-12 flex flex-col items-center">
				<div className="mb-10">
					{/* Main title */}
					<h1 className="text-terracota-500 text-5xl font-medium text-center tracking-wide">
						Need a place to go nearby?
					</h1>
				</div>

				{/* Main searchbar */}
				<div className="flex flex-col mb-20 gap-3 max-w-[1150px] mx-auto relative z-10">
					<SearchBar placeholder="What would you love to discover today?" />
					<CategoryFilter />
				</div>

				{/* Carousel */}
				<div className="w-full rounded-none overflow-hidden  ">
					<Carousel />
				</div>
			</header>
		</div>
	);
}

export default Header;
