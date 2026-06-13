import type { Product } from "../../types/product";

interface ProductCardProps {
	product: Product;
}

function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="max-w-sm overflow-hidden rounded-3xl bg-violet-900 border-0">
			<div className="relative">
				<img
					src={product.image}
					alt=""
					className="w-full h-55 object-cover object-center"
				/>
			</div>

			<div className="px-7 py-7">
				<div className=" flex flex-col gap-2">
					<h2 className="text-2xl font-bold text-violet-50 ">{product.name}</h2>

					<div className="py-2 flex flex-col gap-3">
						<p className="text-violet-50 text-base ">{product.description}</p>

						<p className="text-accent text-xl line-clamp-2">${product.price}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
