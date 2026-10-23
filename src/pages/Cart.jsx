
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-[#f7f6f2] min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-stone-500 uppercase tracking-widest text-sm font-semibold mb-2">
            Your shopping bag
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#292929]">
            Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 text-center py-20 px-6">
            <div className="text-5xl mb-5">🛍️</div>

            <h2 className="text-2xl font-bold text-[#292929] mb-3">
              Your cart is empty
            </h2>

            <p className="text-stone-500 mb-7">
              You haven't added any products to your bag yet.
            </p>

            <Link
              to="/#products"
              className="inline-block bg-[#292929] text-white px-7 py-3 rounded-lg font-semibold hover:bg-stone-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row gap-5"
                >
                  <div className="bg-[#f1f0ec] rounded-lg p-4 flex items-center justify-center sm:w-32 h-32 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-[#292929] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-stone-500 text-sm mb-4">
                      ${item.price.toFixed(2)} each
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-2 hover:bg-stone-100"
                        >
                          −
                        </button>

                        <span className="px-3 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-2 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-[#292929] sm:text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-bold text-[#292929] mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-stone-600 mb-4">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>

              <div className="flex justify-between text-stone-600 mb-4">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-stone-600 mb-5">
                <span>Shipping</span>
                <span className="text-green-700 font-medium">
                  Free
                </span>
              </div>

              <div className="border-t border-stone-200 pt-5 flex justify-between font-bold text-lg text-[#292929]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => alert("Checkout feature coming soon!")}
                className="w-full bg-[#292929] text-white py-3.5 rounded-lg mt-7 font-semibold hover:bg-stone-700 transition"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/#products"
                className="block text-center text-stone-500 hover:text-[#292929] mt-5 text-sm"
              >
                Continue Shopping
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
