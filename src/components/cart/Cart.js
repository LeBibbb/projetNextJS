"use client";

import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <aside className="fixed z-30 top-16 right-0 w-72 h-full bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-orange-600 mb-4">Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="flex items-center gap-4 border-b pb-2">
              <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className=" text-orange-600 font-semibold">{item.title}</p>
                <p className="text-gray-600">{item.price} €</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Cart;
