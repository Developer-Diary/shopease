import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("API Error:", error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#f7f6f2] min-h-screen">
      {/* Hero */}
      <section className="bg-[#eae8e1]">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-stone-500 uppercase tracking-[0.25em] text-sm font-semibold mb-5">
              A better way to shop
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-[#242424] leading-tight mb-6">
              Find your next
              <span className="block text-[#77766d]">favourite thing.</span>
            </h1>

            <p className="text-stone-600 text-lg leading-relaxed mb-9 max-w-lg">
              Explore a collection of everyday essentials and discover products
              you'll love.
            </p>

            <a
              href="#products"
              className="inline-block bg-[#292929] text-white font-semibold px-8 py-4 rounded-lg hover:bg-stone-700 transition"
            >
              Explore Collection →
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <p className="font-bold text-stone-800">✦ Curated Collection</p>
            <p className="text-sm text-stone-500 mt-2">
              Products for everyday living.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <p className="font-bold text-stone-800">♡ Easy Shopping</p>
            <p className="text-sm text-stone-500 mt-2">
              Find what you need with ease.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <p className="font-bold text-stone-800">✓ Simple Cart</p>
            <p className="text-sm text-stone-500 mt-2">
              Manage your shopping in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24"
      >
        <div className="text-center mb-10">
          <p className="text-stone-500 font-semibold uppercase tracking-widest text-sm mb-3">
            Our selection
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#242424]">
            Explore Our Products
          </h2>

          <p className="text-stone-500 mt-3">
            Thoughtfully selected products for you.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full max-w-lg mx-auto border border-stone-200 bg-white rounded-xl p-4 mb-9 outline-none focus:ring-2 focus:ring-stone-400"
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onSelect={setCategory}
        />

        {loading ? (
          <p className="text-center py-10 text-stone-500">
            Loading products...
          </p>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-600 mb-4">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="bg-[#292929] text-white px-6 py-3 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-stone-500 py-12">
            No products found. Try another search.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
