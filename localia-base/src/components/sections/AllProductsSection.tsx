
import { useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import type { Product } from "../../types/product";
import ProductCard from "../cards/ProductCard";

interface AllProductsSectionProps {
	businessId: string;
	showOwnerControls?: boolean;
}

function AllProductsSection({
	businessId,
	showOwnerControls = true,
}: AllProductsSectionProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [showForm, setShowForm] = useState(false);

	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const loadProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/products/${businessId}`,
			);

			const result = await response.json();

			if (response.ok) {
				setProducts(result.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		loadProducts();
	}, [businessId]);

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setImage(file);

		const reader = new FileReader();
		reader.onloadend = () => setPreview(reader.result as string);
		reader.readAsDataURL(file);
	};

	const handleSaveProduct = async () => {
		if (!image || !name || !description || !price) {
			toast.error("Please complete all fields", {
				style: {
					background: "#EAEBFA",
					color: "#1f294e",
					border: "1px solid #1f294e",
				},
			});
			return;
		}

		const formData = new FormData();
		formData.append("business_id", businessId);
		formData.append("name", name);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("image", image);

		const token = useAuth.getState().token;

		const response = await fetch("http://localhost:3000/api/products", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		const result = await response.json();

		if (!response.ok) {
			alert(result.message);
			return;
		}

		await loadProducts();

		setShowForm(false);
		setName("");
		setDescription("");
		setPrice("");
		setImage(null);
		setPreview(null);

		toast.success("Product added", {
			style: {
				background: "#EAEBFA",
				color: "#1f294e",
				border: "1px solid #1f294e",
			},
		});
	};

	const handleDeleteProduct = async (id: string) => {
		const token = useAuth.getState().token;

		const response = await fetch(`http://localhost:3000/api/products/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			setProducts((prev) => prev.filter((p) => p.id !== id));
			toast.success("Product deleted", {
				style: {
					background: "#EAEBFA",
					color: "#1f294e",
					border: "1px solid #1f294e",
				},
			});
		}
	};

	return (
		<div className="w-full max-w-[1150px] mx-auto">
			<div className="flex flex-col gap-10">
				<p className="mb-10 text-4xl font-bold text-violet-700">
					All products ({products.length})
				</p>

				{showOwnerControls && (
					<button
						onClick={() => setShowForm(!showForm)}
						className="w-40 h-12 rounded-full cursor-pointer transition-colors bg-violet-500 hover:bg-violet-300 text-neutral-0"
					>
						Add product
					</button>
				)}

				{showOwnerControls && showForm && (
					<div className="p-5 bg-neutral-0 border border-neutral-200 rounded-2xl flex flex-col gap-4">
						<p className="font-bold text-violet-700 text-xl">New product</p>

						<div className="flex">
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
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<textarea
							placeholder="Product description"
							rows={3}
							className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm resize-none"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<input
							type="number"
							placeholder="Price"
							className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>

						<div className="flex justify-end gap-4">
							<button
								className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-all cursor-pointer text-sm"
								onClick={() => setShowForm(false)}
							>
								Cancel
							</button>

							<button
								className="w-40 h-12 rounded-full cursor-pointer transition-colors bg-violet-500 hover:bg-violet-300 text-neutral-0"
								onClick={handleSaveProduct}
							>
								Save product
							</button>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onDelete={showOwnerControls ? handleDeleteProduct : undefined}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
export default AllProductsSection;
