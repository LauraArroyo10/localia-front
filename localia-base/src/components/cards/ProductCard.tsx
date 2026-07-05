// import { toast } from "sonner";
// import { useAuth } from "../../hooks/useAuth";
// import type { Product } from "../../types/product";

// interface ProductCardProps {
// 	product: Product;
// 	onDelete?: (id: string) => void;
// }

// function ProductCard({ product, onDelete }: ProductCardProps) {
// 	const { user } = useAuth();

// 	return (
// 		<div className="max-w-sm overflow-hidden rounded-3xl bg-violet-900 border-0">
// 			<div className="relative">
// 				<img
// 					src={`http://localhost:3000${product.image}`}
// 					alt=""
// 					className="w-full h-55 object-cover object-center"
// 				/>
// 			</div>

// 			<div className="px-7 py-7">
// 				<div className="flex flex-col gap-2">
// 					<h2 className="text-2xl font-bold text-violet-50">{product.name}</h2>

// 					<div className="py-2 flex flex-col gap-3">
// 						<p className="text-violet-50 text-base">{product.description}</p>

// 						<p className="text-accent text-xl line-clamp-2">${product.price}</p>
// 					</div>

// 					<div className="flex justify-center">
// 						{user?.role === "seller" && (
// 							<button
// 								className="bg-red-500 rounded-lg w-52 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-red-600 transition"
// 								onClick={() =>
// 									toast.custom((t) => (
// 										<div className="bg-violet-100 text-violet-900 border solid border-violet-900 px-4 py-3 rounded-lg flex items-center gap-4">
// 											<span>¿Delete product?</span>

// 											<div className="flex gap-2">
// 												<button
// 													className="bg-red-500 px-3 py-1 text-neutral-0 rounded cursor-pointer"
// 													onClick={() => {
// 														onDelete?.(product.id);
// 														toast.dismiss(t);
// 													}}
// 												>
// 													Delete
// 												</button>

// 												<button
// 													className="bg-gray-500 px-3 py-1 text-neutral-0 rounded cursor-pointer"
// 													onClick={() => toast.dismiss(t)}
// 												>
// 													Cancel
// 												</button>
// 											</div>
// 										</div>
// 									))
// 								}
// 							>
// 								Delete product
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ProductCard;
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import type { Product } from "../../types/product";
import Button from "../ui/Button";

interface ProductCardProps {
	product: Product;
	onDelete?: (id: string) => void;
}

function ProductCard({ product, onDelete }: ProductCardProps) {
	const { user } = useAuth();

	return (
		<div className="max-w-sm overflow-hidden rounded-3xl bg-violet-900 border-0">
			<div className="relative">
				<img
					src={`http://localhost:3000${product.image}`}
					alt=""
					className="w-full h-55 object-cover object-center"
				/>
			</div>

			<div className="px-7 py-7">
				<div className="flex flex-col gap-2">
					<h2 className="text-2xl font-bold text-violet-50">{product.name}</h2>

					<div className="py-2 flex flex-col gap-3">
						<p className="text-violet-50 text-base">{product.description}</p>

						<p className="text-accent text-xl line-clamp-2">${product.price}</p>
					</div>

					<div className="flex justify-center">
						{user?.role === "seller" && (
							<Button
								text="Delete product"
								bgColor="bg-red-500 hover:bg-red-600"
								textColor="text-white"
								size="w-52"
								onClick={() =>
									toast.custom((t) => (
										<div className="bg-violet-100 text-violet-900 border solid border-violet-900 px-4 py-3 rounded-lg flex items-center gap-4">
											<span>¿Delete product?</span>

											<div className="flex gap-2">
												<button
													className="bg-red-500 px-3 py-1 text-neutral-0 rounded cursor-pointer"
													onClick={() => {
														onDelete?.(product.id);
														toast.dismiss(t);
													}}
												>
													Delete
												</button>

												<button
													className="bg-gray-500 px-3 py-1 text-neutral-0 rounded cursor-pointer"
													onClick={() => toast.dismiss(t)}
												>
													Cancel
												</button>
											</div>
										</div>
									))
								}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;