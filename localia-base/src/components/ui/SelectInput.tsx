import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Option {
	value: string;
	label: string;
	sub?: string;
}

interface SelectProps {
	value: string;
	onChange: (value: string) => void;
	required?: boolean;
	placeholder: string;
	options: Option[];
}

function Select({ value, onChange, placeholder, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

	const ref = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const portalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				portalRef.current &&
				!portalRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleOpen = () => {
		if (!isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setDropdownStyle({
				position: "fixed",
				top: rect.bottom + 4,
				left: rect.left,
				width: rect.width,
			});
		}
		setIsOpen(!isOpen);
	};

	const selectedOption = options.find((option) => option.value === value);

	return (
		<div ref={ref} className="relative w-full">
			{/* SELECT BUTTON */}
			<button
				ref={buttonRef}
				type="button"
				onClick={handleOpen}
				className="
          w-full
          h-8.75
          rounded-full
          border
          border-neutral-300
          bg-white
          px-5
          text-sm
          text-violet-900
          flex
          items-center
          justify-between
          outline-none
          transition-all
          focus:border-violet-500
          focus:ring-1
          focus:ring-violet-500
        "
			>
				<span>{selectedOption ? selectedOption.label : placeholder}</span>
				<span className="text-neutral-400">▼</span>
			</button>

			{/* OPTIONS — renderizado fuera del árbol via portal */}
			{isOpen &&
				createPortal(
					<div
						ref={portalRef}
						style={dropdownStyle}
						className="rounded-3xl bg-violet-50 z-9999 max-h-60 overflow-y-auto scrollbar-hide "
					>
						{options.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className="w-full text-left px-5 py-3 hover:bg-neutral-200 transition-colors"
							>
								<p className="text-sm font-medium text-violet-900">
									{option.label}
								</p>
								{option.sub && (
									<p className="text-xs text-neutral-500">{option.sub}</p>
								)}
							</button>
						))}
					</div>,
					document.body,
				)}
		</div>
	);
}

export default Select;
