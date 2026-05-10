import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
    placeholder: string;
    width: string;
}

function SearchBar({
    placeholder,
    width
}: SearchBarProps) {
    return (
        <div className=" flex justify-center">
        <div
            className={`
                ${width}
                flex
                gap-4
            `}
        >
            {/* Input */}
            <div
                className="
                    flex-1
                    h-12
                    border-2
                    border-[#999999]
                    rounded-full
                    px-6
                    flex
                    items-center
                "
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    className="
                        w-full
                        outline-none
                        text-[#1F294E]
                        placeholder:text-[#1F294E]
                    "
                />
            </div>

            {/* Botón de búsqueda */}
            <button
                className="
                    w-24
                    h-12
                    rounded-full
                    bg-[#4D55C8]
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-[#616BFD]
                    
                "
            >
                <CiSearch className="text-white text-4xl" />
            </button>
            </div>
            </div>
    );
}

export default SearchBar;