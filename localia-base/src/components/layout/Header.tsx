import { useState } from "react";
import destinationImg from "../../assets/brand/destination-placeholder.jpg";
import SearchBar from "../ui/SearchBar";
import Carousel from "./HomeCarousel";

function Header() {
	const [activeTab, setActiveTab] = useState("service");

	return (
		<div className="w-full bg-white flex flex-col items-center">
			<header className="w-full max-w-[1200px]px-6  pt-16 pb-12 flex flex-col items-center">
				<div className="mb-6">
					{/* Main title */}
					<h1 className="text-terracota-500 text-5xl font-medium text-center tracking-wide">
						Need a place to go nearby?
					</h1>
				</div>

				{/* Categories (Filtros superiores) */}
				{/*Se necesita poner los iconos de la pagina*/}
				<div className="flex gap-12 mb-8 text-base w-full justify-center">
					{[
						//cambiar para que funcione con backend, borrar despues
						{ id: "service", label: "Service" },
						{ id: "activity", label: "Activity" },
						{ id: "product", label: "Product" },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`pb-2 px-1 font-medium transition-all border-b-2 cursor-pointer
                ${
									activeTab === tab.id
										? "border-violet-500 text-violet-500"
										: "border-transparent text-gray-400 hover:text-violet-500"
								}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Main searchbar */}
				<div className="w-full mb-12">
					<SearchBar
						width="w-300"
						placeholder="What would you love to discover today?"
					/>
				</div>

				{/* Carousel */}
				<div className="w-full rounded-none overflow-hidden ">
					<Carousel />
				</div>
			</header>
		</div>
	);
}

export default Header;
