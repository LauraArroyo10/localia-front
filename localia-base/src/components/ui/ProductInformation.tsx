import type { Product } from "../../types/product";

interface ProductInformationProps {
	product: Product;
}

export default function ProductInformation({
	product,
}: ProductInformationProps) {
	return (
		<div className="max-w-[1150px] mx-auto px-10 bg-violet-50 rounded-3xl">
			<div className="flex flex-col gap-8 p-10">
				<div className="w-full">
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-[550px] object-cover rounded-3xl"
					/>
				</div>

				<div className="flex flex-col gap-4">
					<h1 className="text-violet-900 text-4xl font-bold">{product.name}</h1>

					<p className="text-violet-900 text-lg leading-relaxed">
						{product.description}
					</p>

					<p className="text-2xl font-semibold text-terracota-500">
						${product.price}
					</p>
				</div>
			</div>
		</div>
	);
}
