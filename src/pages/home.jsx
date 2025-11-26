import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Dummy categories (Petpooja style)
  const categories = ["All", "Snacks", "Beverages", "Fast Food", "Bakery"];

  // Dummy products (later we will connect backend)
  const allProducts = [
    { id: 1, name: "Burger", price: 80, category: "Fast Food", img: "/p1.png" },
    { id: 2, name: "Pizza", price: 150, category: "Fast Food", img: "/p2.png" },
    { id: 3, name: "Cold Drink", price: 40, category: "Beverages", img: "/p3.png" },
    { id: 4, name: "Chips", price: 20, category: "Snacks", img: "/p4.png" },
    { id: 5, name: "Muffin", price: 30, category: "Bakery", img: "/p5.png" },
  ];

  useEffect(() => {
    setProducts(allProducts);
  }, []);

  // Add product to cart
  const addToCart = (p) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.id === p.id);
      if (exist) {
        return prev.map((x) =>
          x.id === p.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT SIDE MENU + PRODUCTS */}
      <div className="w-3/4 p-4 overflow-y-auto">

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl text-lg"
        />

        {/* Categories */}
        <div className="flex gap-3 mb-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold 
                ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white shadow rounded-xl p-4 cursor-pointer hover:scale-105 transition"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-28 w-full object-cover rounded-lg mb-3 bg-gray-200"
              />
              <div className="font-bold text-lg">{p.name}</div>
              <div className="text-gray-600">₹{p.price}</div>
            </div>
          ))}
        </div>

      </div>

      {/* CART BUTTON (BOTTOM RIGHT) */}
      <button
        onClick={() => navigate("/cart", { state: { cart } })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-xl text-lg font-bold"
      >
        Cart ({cart.reduce((t, i) => t + i.qty, 0)})
      </button>

    </div>
  );
}
