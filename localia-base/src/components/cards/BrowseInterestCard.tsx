import { useNavigate } from "@tanstack/react-router";

const categories = [
	{ name: "Artisan Goods", img: "/img/artisan.jpg" },
	{ name: "Local Food", img: "/img/food.jpg" },
	{ name: "Culture", img: "/img/culture.jpg" },
	{ name: "Beach", img: "/img/beach.jpg" },
	{ name: "Mountain", img: "/img/montain.jpg" },
	{ name: "Town", img: "/img/town.jpg" },
];

function BrowseInterest() {
	const navigate = useNavigate();

	return (
		<section className="w-full bg-violet-50 py-16 px-6 flex flex-col items-center">
			<div className="w-full max-w-[1150px]">
				<div className="mb-6">
					<h2 className="text-3xl font-bold mb-2 text-left">
						Browse by Interest
					</h2>
					<p className="text-sm text-neutral-600 mb-10 text-left">
						Explore experiences designed around what you love
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((cat) => (
						<div
							key={cat.name}
							onClick={() =>
								navigate({
									to: "/results",
									search: { category: cat.name },
								})
							}
							className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
						>
							<img
								src={cat.img}
								alt={cat.name}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							<div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-transparent to-transparent p-6">
								<h3 className="text-neutral-0 font-bold text-xl tracking-wide">
									{cat.name}
								</h3>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default BrowseInterest;
