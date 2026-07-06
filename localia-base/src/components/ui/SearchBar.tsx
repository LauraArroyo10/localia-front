import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
	placeholder: string;
}

function SearchBar({ placeholder }: SearchBarProps) {
	return (
		<div className="flex justify-center w-full">
			<div
				className="
          w-300
          flex
          gap-4
        "
			>
				{/* INPUT */}
				<div
					className="
            flex-1
            h-12
            border
            rounded-full
            px-6
            flex
            items-center
            bg-neutral-0
            border-neutral-300
            focus-within:border-violet-500
            focus-within:ring-1
            focus-within:ring-violet-500
            transition-all
          "
				>
					<input
						type="text"
						placeholder={placeholder}
						autoComplete="off"
						className="
    w-full
    outline-none
    bg-transparent
    text-violet-900
    placeholder:text-neutral-400
  "
					/>
				</div>

				{/* SEARCH BUTTON */}
				<button
					className="
            w-24
            h-12
            rounded-full
            flex
            items-center
            justify-center
            cursor-pointer
            transition-colors
            bg-violet-500
            hover:bg-violet-300
          "
				>
					<CiSearch
						className="
              text-neutral-0
              text-4xl
            "
					/>
				</button>
			</div>
		</div>
	);
}

export default SearchBar;
