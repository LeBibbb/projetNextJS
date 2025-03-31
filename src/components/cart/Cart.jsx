"use client";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/lib/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      dispatch(cartActions.addItem(item));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(cartActions.removeItem(itemId));
  };

  return (
    <aside className="fixed z-30 top-16 right-0 w-72 h-full bg-zinc-800 shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-orange-600 mb-4">Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="flex items-center gap-4 border-b pb-2">
              <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
              <div className="flex items-center space-x-9">
                <div>
                  <p className="text-orange-600 font-semibold">{item.title}</p>
                  <p className="text-white">{item.price} €</p>
                </div>
                <div className="flex border-2 border-white px-1 rounded-full space-x-2">
                  <button 
                    onClick={() => handleRemoveItem(item.id)} 
                    className="text-2xl text-white">
                    -
                  </button>
                  <p className="pt-1 text-white">{item.quantity}</p>
                  <button 
                    onClick={() => handleAddItem(item.id)} 
                    className=" text-2xl text-white fs-">
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Cart;
