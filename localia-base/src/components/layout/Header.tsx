import Carousel from "./HomeCarousel";
import SearchBar from "../ui/SearchBar";
import { useState } from "react";

function Header() {
  const [activeTab, setActiveTab] = useState("service");

  return (
    <div className="w-full flex flex-col items-center">
      <header className="w-full px-6 pt-8 pb-6 flex flex-col items-center">
        
        <h1 className="text-terracota-500 text-3xl font-medium text-center mb-5 tracking-wide">
          Need a place to go nearby?
        </h1>

        <div className="flex gap-8 mb-5 text-sm border-b border-gray-100 w-full justify-center">
          {[
            { id: "service", label: "Service" },
            { id: "activity", label: "Activity" },
            { id: "product", label: "Product" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 font-medium transition-all border-b-2 cursor-pointer
                ${activeTab === tab.id
                  ? "border-violet-500 text-violet-500"
                  : "border-transparent text-gray-400 hover:text-violet-500"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full mb-6">
          <SearchBar placeholder="Search businesses..." width="w-300" />
        </div>

        <div className="w-full  max-w-300 rounded-2xl overflow-hidden  mt-10 ">
          <Carousel />
        </div>

      </header>
    </div>
  );
}

export default Header;