"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { cartActions } from "@/lib/slices/cartSlice";
import { useRouter } from "next/navigation";

const generateActivationKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";
  for (let i = 0; i < 12; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

const Confirmation = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const router = useRouter();
  const [activationKeys, setActivationKeys] = useState([]);

  useEffect(() => {
    const keys = cartItems.flatMap((item) => {
      return Array.from({ length: item.quantity }, () => generateActivationKey());
    });
    setActivationKeys(keys);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleReturnToHome = () => {
    dispatch(cartActions.clearCart());
    router.push("/");  
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-6 ${
        darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-11/12 sm:w-7/10 lg:w-7/10 xl:w-7/10 p-6 rounded-lg ${
          darkMode ? "bg-zinc-700" : "bg-orange-500"
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-6 ${
            darkMode ? "text-orange-600" : "text-white"
          }`}
        >
          Confirmation de commande
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <>
            <table className="min-w-full table-auto text-left mb-6">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Produit</th>
                  <th className="py-2 px-4">Prix Unitaire</th>
                  <th className="py-2 px-4">Clé d'activation</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const keysForItem = activationKeys.slice(
                    index * item.quantity,
                    (index + 1) * item.quantity
                  );

                  return (
                    <>
                      {keysForItem.map((key, i) => (
                        <tr key={`${index}-${i}`} className="border-b">
                          <td className="py-2 px-4">{item.title}</td>
                          <td className="py-2 px-4">{item.price} €</td>
                          <td
                            className={`py-2 px-4 ${
                              darkMode ? "text-orange-600" : "text-white"
                            }`}
                          >
                            {key}
                          </td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>

            <p className="text-center mt-4 text-green-600">
              Merci pour votre achat ! Vous pouvez maintenant utiliser les clés d'activation pour activer vos produits.
            </p>
          </>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleReturnToHome}
            className={`py-2 px-4 ${
              darkMode ? "bg-orange-600" : "bg-orange-600"
            } text-white rounded-lg hover:bg-orange-500 transition duration-300`}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
