"use client";

import { useSelector } from "react-redux";
import Navbar from "@/components/navbar/Navbar";
import Cart from "@/components/cart/Cart";

export default function ClientLayout({ children }) {
  const viewCart = useSelector((state) => state.cart.isCartVisible); // ✅ Correction ici

  return (
    <div>
      <Navbar />
      {viewCart && <Cart />}
      {children}
    </div>
  );
}
