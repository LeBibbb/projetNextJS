"use client";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/lib/slices/cartSlice";
import Link from "next/link";
import { useState } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Récupère l'état darkMode du Redux store
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleAddItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      dispatch(cartActions.addItem(item));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(cartActions.removeItem(itemId));
  };

  const handlePayement = () => {
    dispatch(cartActions.toggleView());
    setIsOverlayVisible(false);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      dispatch(cartActions.toggleView());
      setIsOverlayVisible(false);
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <div
          className="overlay fixed inset-0 bg-black opacity-50 z-20"
          onClick={handleOverlayClick}
        ></div>
      )}

      <aside
        className={`fixed z-30 top-16 right-0 w-72 h-9/12 p-4 overflow-y-auto transition-transform duration-300 border-4 rounded-2xl m-2 border-l-zinc-700 border-zinc-700 ${
          darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Votre Panier</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center gap-4 border-b pb-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p
                      className={`font-semibold ${
                        darkMode ? "text-orange-600" : "text-orange-600"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p>{item.price} €</p>
                  </div>

                  <div className="flex items-center border-2 border-white px-1 rounded-full space-x-2 ml-auto">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className={`text-2xl p-1 ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      -
                    </button>
                    <p
                      className={`pt-1 p-1 ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => handleAddItem(item.id)}
                      className={`text-2xl p-1 ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-white font-semibold">
              <p>Total</p>
              <p>{totalPrice.toFixed(2)} €</p>
            </div>
            <Link href="/payement">
              <button
                onClick={handlePayement}
                className="mt-4 w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition duration-300"
              >
                Aller au paiement
              </button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
