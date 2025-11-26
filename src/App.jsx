import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import POS from './pages/pos'
import Home from './pages/home'
import Cart from './pages/cart'
import Bill from './pages/bill'
import Products from './pages/products'
import Sales from './pages/sales'
import Settings from './pages/settings'
import Orders from './pages/orders'
import KOT from './pages/kot'
import Reports from './pages/reports'

export default function App(){
  return (
    <div className="app-root">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/pos" element={<POS/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/bill" element={<Bill/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/kot" element={<KOT/>} />
            <Route path="/reports" element={<Reports/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
