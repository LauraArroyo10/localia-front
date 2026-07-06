import { useNavigate } from "@tanstack/react-router";

interface FavoriteItem {
	id: string;
	name: string;
	imageUrl: string;
	location: string;
}

interface FavoritesPopupProps {
	favorites: FavoriteItem[];
	onClose: () => void;
}

export default function FavoritesPopup({
	favorites,
	onClose,
}: FavoritesPopupProps) {
	const navigate = useNavigate();

	/**
	 * Cierra el popup y lleva al usuario a la vista del negocio seleccionado.
	 */
	const handleSelect = (id: string) => {
		onClose();

		navigate({
			to: "/dashboard",
			search: {
				businessId: id,
			},
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-900/40">
			<div className="w-full max-w-md rounded-3xl bg-neutral-0 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-violet-500">
						My Favorites
					</h2>
					<button
						onClick={onClose}
						className="text-neutral-400 hover:text-neutral-600 cursor-pointer text-2xl leading-none"
					>
						&times;
					</button>
				</div>

				{favorites.length === 0 ? (
					<p className="text-sm text-neutral-500 py-6 text-center">
						You haven't saved any favorites yet.
					</p>
				) : (
					<div className="flex flex-col gap-3 max-h-96 overflow-y-auto scrollbar-hide">
						{favorites.map((fav) => (
							<button
								key={fav.id}
								onClick={() => handleSelect(fav.id)}
								className="flex items-center gap-4 p-3 rounded-2xl hover:bg-violet-50 transition-colors cursor-pointer text-left review-enter"
							>
								<img
									src={fav.imageUrl}
									alt={fav.name}
									className="w-12 h-12 rounded-full object-cover"
								/>
								<div>
									<p className="font-semibold text-neutral-800">{fav.name}</p>
									<p className="text-sm text-terracota-400">{fav.location}</p>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
