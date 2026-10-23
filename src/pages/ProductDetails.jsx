import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

 useEffect(() => {
  let isMounted = true;

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (isMounted) {
        setProduct(data);
      }
    })
    .catch((error) => console.error(error))
    .finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

  return () => {
    isMounted = false;
  };
}, [id]);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  if (loading) {
    return (
      <p className="text-center py-20 text-stone-500">
        Loading product...
      </p>
    );
  }

  if (!product || !product.id) {
    return (
      <p className="text-center py-20 text-stone-500">
        Product not found.
      </p>
    );
  }

  return (
    <div className="bg-[#f7f6f2] min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/"
          className="text-stone-500 hover:text-[#292929] transition"
        >
          ← Back to shopping
        </Link>

        <div className="bg-white rounded-2xl border border-stone-200 mt-8 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="bg-[#f1f0ec] rounded-xl flex items-center justify-center p-10 min-h-80">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 max-w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-stone-500 font-semibold mb-4">
              {product.category}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#292929] mb-5">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-amber-600">★</span>
              <span className="text-stone-600 text-sm">
                {product.rating?.rate || "No rating"} / 5
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-[#292929] mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-stone-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              className={`w-full md:w-fit px-8 py-4 rounded-lg font-semibold text-white transition ${
                added
                  ? "bg-green-700"
                  : "bg-[#292929] hover:bg-stone-700"
              }`}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;