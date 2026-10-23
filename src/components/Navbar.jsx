
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("home");

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Scroll to the correct section when the route changes
  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#products") {
      requestAnimationFrame(() => {
        document.getElementById("products")?.scrollIntoView({
          behavior: "smooth",
        });
      });
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  // Detect whether the user is viewing Home or Products
  useEffect(() => {
    function handleScroll() {
      const productsSection = document.getElementById("products");

      if (productsSection) {
        const position = productsSection.getBoundingClientRect().top;

        if (position <= 180) {
          setActiveSection("products");
        } else {
          setActiveSection("home");
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navStyle = (active) =>
    `py-2 border-b-2 transition duration-200 ${
      active
        ? "text-[#292929] border-[#292929] font-bold"
        : "text-stone-500 border-transparent hover:text-[#292929] hover:border-stone-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex justify-between items-center">

        <Link
          to="/"
          onClick={() => setActiveSection("home")}
          className="text-2xl font-black tracking-tight text-[#292929]"
        >
          SHOPEASE<span className="text-stone-400">.</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base font-medium">

          <Link
            to="/"
            onClick={() => {
              setActiveSection("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={navStyle(
              location.pathname === "/" && activeSection === "home"
            )}
          >
            Home
          </Link>

          <Link
            to="/#products"
            onClick={() => {
              setActiveSection("products");

              if (location.pathname === "/") {
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className={navStyle(
              location.pathname === "/" && activeSection === "products"
            )}
          >
            Products
          </Link>

          <NavLink
            to="/cart"
            className={({ isActive }) => navStyle(isActive)}
          >
            Cart ({cartCount})
          </NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
