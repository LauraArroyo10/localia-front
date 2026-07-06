import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../types/categories";

interface CategoryFilterProps {
	value?: string;
	onChange: (category: string | undefined) => void;
}

function CategoryFilter({ value, onChange }: CategoryFilterProps) {
	/**
	 * Controla si el menú de categorías está abierto o cerrado.
	 */
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const options = ["All", ...CATEGORIES];

	/**
	 * Cierra el menú cuando el usuario hace clic fuera del componente.
	 */
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={ref} className="relative z-50">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-violet-900 text-violet-50 px-6 py-3 rounded-3xl cursor-pointer hover:bg-violet-700 transition-colors"
			>
				{value ?? "Category"} ▼
			</button>

			{isOpen && (
				<div className="absolute top-16 bg-violet-50 rounded-3xl overflow-hidden w-60 max-h-40 overflow-y-auto  z-50">
					{options.map((category) => (
						<p
							key={category}
							onClick={() => {
								onChange(category === "All" ? undefined : category);
								setIsOpen(false);
							}}
							className="px-5 py-3 cursor-pointer text-neutral-800 hover:bg-neutral-200 transition-colors"
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
