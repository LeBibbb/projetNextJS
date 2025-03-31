"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/lib/slices/cartSlice";

const Navbar = () => {
    const dispatch=useDispatch();
    const cartLength = useSelector((state) => state.cart.items)
    console.log(cartLength)

    const handleVisible = () => {
      dispatch(cartActions.toggleView())
    }
  return (
    <nav className="z-50 bg-orange-600 text-white h-16 shadow-lg fixed top-0 left-0 w-full flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          <span className="bg-white text-orange-600 px-2 py-1 rounded-md">LATENCE</span>
          GAMING
        </Link>

        <div className="flex space-x-6">
          <div className="flex space-x-6">
          <Link
            href="/games"
            className="text-lg font-semibold transition duration-300 hover:text-orange-300"
          >
            GAMES
          </Link>
          <div onClick={handleVisible} className="text-lg font-semibold transition duration-300 hover:text-orange-300 cursor-pointer" >CART</div>

          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
