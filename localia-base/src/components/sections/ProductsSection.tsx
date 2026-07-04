import ProductCard from "../cards/ProductCard";
import { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import type { Product } from "../../types/product";

function ProductSection() {
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const products: Product[] = [];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0];

	if (!file) return;

	const reader = new FileReader();

	reader.onloadend = () => {
		setPreview(reader.result as string);
	};

	reader.readAsDataURL(file);
  };
  return (
    <div className="w-full max-w-[1150px] mx-auto ">
      <div className="flex flex-col gap-10">
        <p className="mb-10 text-4xl font-bold text-violet-700">
          Featured products
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className=" w-40 h-12 rounded-full cursor-pointer transition-colors bg-violet-500 hover:bg-violet-300 text-neutral-0">
          Add product
        </button>
        

        {showForm && (
	<div className="p-5 bg-neutral-0 border border-neutral-200 rounded-2xl flex flex-col gap-4">

		<p className="font-bold text-violet-700 text-xl">
			New product
		</p>

		<div className="flex ">
	<label
		htmlFor="product-image"
		className="w-40 h-24 rounded-2xl bg-violet-50 flex items-center justify-center overflow-hidden hover:bg-violet-100 transition cursor-pointer"
	>
		{preview ? (
			<img
				src={preview}
				alt="Product preview"
				className="w-full h-full object-cover"
			/>
		) : (
			<MdCameraAlt size={40} className="text-violet-500" />
		)}
	</label>

	<input
		id="product-image"
		type="file"
		accept="image/*"
		className="hidden"
		onChange={handleFile}
	/>
</div>

		<input
			type="text"
			placeholder="Product name"
			className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
		/>

		<textarea
			placeholder="Product description"
			rows={3}
			className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm resize-none"
		/>

		<input
			type="number"
			placeholder="Price"
			className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
		/>

            <div className="flex justify-end gap-4">
              <button
		className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-all cursor-pointer text-sm"
		onClick={() => setShowForm(false)}
	>
		Cancelar
	</button>
			<button
				className="w-40 h-12 rounded-full cursor-pointer transition-colors bg-violet-500 hover:bg-violet-300 text-neutral-0"
			>
				Guardar producto
			</button>
		</div>

	</div>
)}

				<div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductSection;