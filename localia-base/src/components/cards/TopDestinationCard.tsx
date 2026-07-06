import type { LocalBusiness } from "../../types/localBusiness";

/**
 * Props para la tarjeta de destino destacado.
 */
interface TopDestinationCardProps {
	business: LocalBusiness;
	onViewMore: (id: string) => void;
}

/**
 * Tarjeta de destino destacado que permite ver más detalles al pulsar.
 */
function TopDestinationCard({ business, onViewMore }: TopDestinationCardProps) {
	return (
		<div
			className="flex-1 min-w-[260px] overflow-hidden flex flex-col gap-3 cursor-pointer"
			onClick={() => onViewMore(business.id)}
		>
			<img
				src={business.image_url ?? undefined}
				alt={business.name}
				className="w-full h-70 object-cover rounded-2xl"
			/>

			<span className="text-violet-500 font-semibold text-sm px-1">
				{business.name}
			</span>

			<p className="text-xs text-neutral-500 leading-relaxed px-1 line-clamp-3">
				{business.description}
			</p>
		</div>
	);
}

export default TopDestinationCard;
