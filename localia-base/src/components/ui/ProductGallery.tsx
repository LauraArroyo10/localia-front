import type { Product } from "../../types/product";

interface ProductGalleryProps {
    products: Product[];
}

export default function ProductGallery({ products }: ProductGalleryProps) {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-violet-900 font-semibold text-3xl mb-6" >Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
                
                
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col items-center gap-3">
                        
                        <div className="overflow-hidden rounded-3xl w-full">
                            <img
                                src={product.image}
                                alt={product.name}
                                className=" w-full h-60 object-cover"
                            />
                        </div>

                        <button className="text-violet-900 font-semibold text-xl hover:underline cursor-pointer">
                            See more
                        </button>

                    </div>
                ))}

            </div>
        </div>
    );
}