import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <div className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300">

      <Link to={`/product/${product.id}`}>
        <div className="bg-[#f1f0ec] h-64 flex items-center justify-center p-7">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-stone-800 line-clamp-2 min-h-12 hover:text-stone-500 transition">
            {product.title}
          </h3>
        </Link>

        <div className="flex justify-between items-center mt-4 gap-2">
          <p className="text-xl font-bold text-stone-900">
            ${product.price.toFixed(2)}
          </p>

          {added ? (
            <button className="bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
              ✓ Added!
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-[#292929] hover:bg-stone-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
            >
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;