import { useState, useEffect, useRef } from "react";


function CategoryFilter() {

    const [isOpen, setIsOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("Category");

    const ref = useRef<HTMLDivElement>(null);

    const categories = [
        "All",
        "Cafe",
        "Restaurant",
        "Fast Food",
        "Healthy",
        "Beauty",
        "Clothing",
        "Technology",
        "Pets",
        "Home Decor",
        "Fitness",
        "Services",
        "Other"
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
    <div ref={ref} className="relative z-50">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-violet-900 text-[#E4E6F7] px-6 py-3 rounded-3xl cursor-pointer"
        >
            {selectedCategory} ▼
        </button>

        {isOpen && (
            <div className="absolute top-16 bg-[#E4E6F7] rounded-3xl  overflow-hidden w-60 max-h-40 overflow-y-auto z-50">
                {categories.map((category) => (
                    <p
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setIsOpen(false);
                        }}
                        className="px-5 py-3 cursor-pointer hover:bg-gray-200"
                    >
                        {category}
                    </p>
                ))}
            </div>
        )}
    </div>
);

}

export default CategoryFilter;