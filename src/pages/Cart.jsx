import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];

  const increaseQty = (id) => {
    state.cart = cart.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    );
  };

  const decreaseQty = (id) => {
    state.cart = cart
      .map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      )
      .filter((i) => i.qty > 0);
  };

  const deleteItem = (id) => {
    state.cart = cart.filter((i) => i.id !== id);
    navigate("/cart", { state: { cart: state.cart } });
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4">

      {/* LEFT SIDE: CART LIST */}
      <div className="w-2/3 bg-white shadow-lg rounded-xl p-4 overflow-y-auto">

        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>

        {cart.length === 0 ? (
          <div className="text-center text-lg text-gray-500 pt-20">
            Cart is empty
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              {/* Item Name */}
              <div className="w-1/3">
                <div className="font-bold text-lg">{item.name}</div>
                <div className="text-gray-600">₹{item.price}</div>
              </div>

              {/* Qty Control */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    decreaseQty(item.id);
                    navigate("/cart", { state: { cart: state.cart } });
                  }}
                  className="bg-gray-300 px-3 py-1 rounded-lg text-xl"
                >
                  –
                </button>

                <div className="w-8 text-center font-bold text-lg">
                  {item.qty}
                </div>

                <button
                  onClick={() => {
                    increaseQty(item.id);
                    navigate("/cart", { state: { cart: state.cart } });
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xl"
                >
                  +
                </button>
              </div>

              {/* Line Price */}
              <div className="text-lg font-semibold">
                ₹{item.price * item.qty}
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE: BILL SUMMARY */}
      <div className="w-1/3 bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Bill Summary</h2>

        {/* Subtotal */}
        <div className="flex justify-between text-lg mb-2">
          <span>Subtotal:</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-lg mb-2">
          <span>Tax (12%):</span>
          <span className="font-semibold">₹{tax.toFixed(2)}</span>
        </div>

        <hr className="my-3" />

        {/* Total */}
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        {/* Payment Mode */}
        <label className="block text-gray-700 font-semibold mb-2">
          Payment Mode
        </label>

        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        {/* Generate Bill */}
        <button
          onClick={() => alert("Bill Generated (Dummy)")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg"
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
}
