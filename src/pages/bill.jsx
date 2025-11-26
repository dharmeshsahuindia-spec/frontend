import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Bill() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded mt-6 print:w-full print:shadow-none print:mt-0">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <img src="/logo.png" alt="logo" className="h-16 mx-auto mb-2" />
        <h1 className="text-xl font-bold">ADMemsaab POS</h1>
        <p className="text-gray-600">Retail Billing System</p>
      </div>

      {/* Bill Details */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Date:</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mt-1">
          <span>Bill No:</span>
          <span>{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Item</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.qty}</td>
              <td className="p-2 border">₹{item.price}</td>
              <td className="p-2 border font-semibold">
                ₹{item.qty * item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="mt-4 text-sm">
        <div className="flex justify-between py-1">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-2 font-bold border-t mt-2 text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 print:hidden">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded w-full"
        >
          Back to POS
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded w-full"
        >
          Print Bill
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-6 print:mt-2">
        Powered by ADMemsaab.com
      </p>
    </div>
  );
}
