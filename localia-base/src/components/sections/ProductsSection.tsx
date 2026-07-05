import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import ProductCard from "../cards/ProductCard";

function ProductSection({ businessId }: { businessId: string }) {
	const [products, setProducts] = useState<Product[]>([]);
	const navigate = useNavigate();

	const loadProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products/${businessId}`,
			);

			const result = await response.json();

			if (response.ok) {
				setProducts(result.data);
			} else {
				alert(result.message);
			}
		} catch (error) {
			console.error(error);
			alert("Error loading products");
		}
	};

	useEffect(() => {
		loadProducts();
	}, [businessId]);

	return (
		<div className="w-full max-w-[1150px] mx-auto">
			<div className="flex flex-col gap-10">
				<p className="mb-10 text-4xl font-bold text-violet-700">
					Featured products
				</p>

				<button
					onClick={() =>
						navigate({
							to: "/ProductsPage",
							search: {
								businessId,
							},
						})
					}
					className="w-40 h-12 rounded-full cursor-pointer transition-colors bg-violet-500 hover:bg-violet-300 text-neutral-0"
				>
					View all products
				</button>

				<div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
					{products.slice(0, 6).map((product) => (
						<ProductCard key={product.id} product={product} businessId={businessId}/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductSection;
