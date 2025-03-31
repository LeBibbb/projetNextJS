"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Payement = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  return (
    <div className="min-h-screen bg-zinc-800 text-white flex justify-center items-center p-6">
      <div className="w-11/12 sm:w-7/10 lg:w-7/10 xl:w-7/10 flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Choisissez votre moyen de paiement</h2>
          <div className="space-y-4">
            {["Carte bancaire", "PayPal", "Apple Pay"].map((method, index) => (
              <div
                key={index}
                onClick={() => handlePaymentSelect(method)}
                className={`cursor-pointer p-4 rounded-lg transition duration-300 ${
                  selectedPayment === method
                    ? "border-2 border-orange-600"
                    : "border border-gray-600"
                }`}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
          <ul className="space-y-2 mb-6">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <div>
                  <p className="text-orange-600">{item.title}</p>
                  <p>{item.quantity} x {item.price} €</p>
                </div>
                <p>{(item.quantity * item.price).toFixed(2)} €</p>
              </li>
            ))}
          </ul>


          <div className="flex justify-between text-lg font-semibold mb-4">
            <p>Total à payer</p>
            <p>{totalPrice.toFixed(2)} €</p>
          </div>

  
          <Link href="/confirmation">
            <button
              className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition duration-300"
            >
              Payer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payement;
