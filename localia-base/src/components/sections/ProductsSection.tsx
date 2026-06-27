import { mockProducts } from "../../mockData/mockProducts";
import ProductCard from "../cards/ProductCard";

function ProductSection() {
  return (
    <div className="w-full max-w-[1150px] mx-auto ">
      <div className="flex flex-col gap-10">
        <p className="mb-10 text-4xl font-bold text-violet-700">
          Productos destacados
        </p>

				<div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
					{mockProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductSection;
