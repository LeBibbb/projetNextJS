"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/lib/slices/cartSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.cart.items);
  console.log(cartLength);

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false
  );

  const handleVisible = () => {
    dispatch(cartActions.toggleView());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="z-50 bg-orange-600 text-white h-16 shadow-lg fixed top-0 left-0 w-full flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide flex items-center gap-2"
        >
          <span className="bg-white text-orange-600 px-2 py-1 rounded-md">
            LATENCE
          </span>
          GAMING
        </Link>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex space-x-6">
          <div className="flex space-x-6">
            <Link
              href="/games"
              className="text-lg font-semibold transition duration-300 hover:text-orange-300"
            >
              GAMES
            </Link>
            <div
              onClick={handleVisible}
              className="text-lg font-semibold transition duration-300 hover:text-orange-300 cursor-pointer"
            >
              CART
            </div>
            <button
            onClick={toggleDarkMode}
            className="x rounded-md bg-gray-200 text-gray-900 dark:bg-orange-600 dark:text-white transition duration-300"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-orange-600 text-white p-4 absolute top-16 left-0 w-full">
          <div className="flex flex-col space-y-4">
            <Link
              href="/games"
              className="text-lg font-semibold transition duration-300 hover:text-orange-300"
              onClick={toggleMenu}
            >
              GAMES
            </Link>
            <div
              onClick={() => {
                handleVisible();
                toggleMenu();
              }}
              className="text-lg font-semibold transition duration-300 hover:text-orange-300 cursor-pointer"
            >
              CART
            </div>
            <button
              onClick={() => {
                toggleDarkMode();
                toggleMenu();
              }}
              className="p-2 rounded-md bg-gray-200 text-gray-900 dark:bg-zinc-700 dark:text-white transition duration-300"
            >
              {darkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
