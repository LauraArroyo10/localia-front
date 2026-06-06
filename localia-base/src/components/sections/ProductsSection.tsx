import ProductCard from "../cards/ProductCard";
import type { Product } from "../../types/product";

function ProductSection() {
    const products: Product[] = [
        {
            id: 1,
            name: "Jabón artesanal",
            description: "Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel ",
            image: "/img/jabones.jpg",
            price: 10,
        },
        {
            id: 2,
            name: "Jabón artesanal",
            description: "Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel ",
            image: "/img/jabones.jpg",
            price: 10,
        },
        {
            id: 3,
            name: "Jabón artesanal",
            description: "Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel ",
            image: "/img/jabones.jpg",
            price: 10,
        },
        {
            id: 4,
            name: "Jabón artesanal",
            description: "Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel ",
            image: "/img/jabones.jpg",
            price: 10,
        },
        {
            id: 5,
            name: "Jabón artesanal",
            description: "Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel ",
            image: "/img/jabones.jpg",
            price: 10,
        },
        {
            id: 6,
            name: "Jabón artesanal",
            description: "Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel Jabon vegano cuida tu piel ",
            image: "/img/jabones.jpg",
            price: 10,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 ">
            <div className=" flex flex-col gap-10 ">
            <p className="text-4xl text-violet-700  font-bold mb-10">
                    Productos destacados
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
                </div>
                </div>
        </div>
    );
}

export default ProductSection;