import { useState } from "react";
import { TbBuildingStore, TbCamera, TbGift } from "react-icons/tb";
import Button from "../../ui/Button";

const SERVICE_OPTIONS = [
	{
		id: "service",
		label: "Service",
		sub: "Gastronomy, Tours, Wellness...",
		icon: <TbBuildingStore size={32} strokeWidth={1.2} />,
	},
	{
		id: "activity",
		label: "Activity",
		sub: "Sports, cultural immersion...",
		icon: <TbCamera size={32} strokeWidth={1.2} />,
	},
	{
		id: "product",
		label: "Product",
		sub: "Food, art, souvenirs...",
		icon: <TbGift size={32} strokeWidth={1.2} />,
	},
];

interface StepWhatOfferProps {
	onNext: () => void;
	onBack: () => void;
}

export function StepWhatOffer({ onNext, onBack }: StepWhatOfferProps) {
	const [selected, setSelected] = useState<string[]>([]);

	/**
	 * Alterna la selección de una opción para definir qué ofrece el negocio.
	 */
	const toggle = (id: string) =>
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
		);

	return (
		<div className="flex flex-col gap-3 w-full">
			<h2 className="text-xl font-bold text-neutral-800 text-center">
				What do you offer?
			</h2>

			<div className="flex flex-col gap-3">
				{SERVICE_OPTIONS.map(({ id, label, sub, icon }) => {
					const isSelected = selected.includes(id);
					return (
						<button
							key={id}
							type="button"
							onClick={() => toggle(id)}
							className={`flex items-center justify-between px-5 py-4 rounded-2xl border text-left transition-all
                ${
									isSelected
										? "border-violet-500 bg-violet-50"
										: "border-neutral-200 bg-neutral-0"
								}`}
						>
							<div className="flex items-center gap-4">
								<span
									className={
										isSelected ? "text-violet-500" : "text-terracota-500"
									}
								>
									{icon}
								</span>
								<div>
									<p className="text-sm font-semibold text-neutral-800">
										{label}
									</p>
									<p className="text-xs text-neutral-400">{sub}</p>
								</div>
							</div>
							<span className="text-violet-500 text-lg"></span>
						</button>
					);
				})}
			</div>

			<div className="flex justify-between pt-2">
				<Button
					text="Back"
					bgColor="bg-neutral-100"
					textColor="text-neutral-700"
					size="w-28"
					onClick={onBack}
				/>
				<Button
					text="Next"
					bgColor="bg-violet-500"
					textColor="text-neutral-0"
					size="w-28"
					onClick={onNext}
					disabled={selected.length === 0}
				/>
			</div>
		</div>
	);
}
