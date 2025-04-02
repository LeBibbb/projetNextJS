"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/navbar/Navbar";
import Cart from "@/components/cart/Cart";

export default function ClientLayout({ children }) {
  const viewCart = useSelector((state) => state.cart.isCartVisible); 
  const darkMode = useSelector((state) => state.theme.darkMode);  

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div>
      <Navbar />
      {viewCart && <Cart />}
      {children}
    </div>
  );
}
