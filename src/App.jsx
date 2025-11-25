import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import POS from './pages/POS';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Settings from './pages/Settings';

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="header p-4 flex justify-between items-center">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src="/logo.png" alt="logo" style={{height:40}} />
          <div style={{fontSize:20,fontWeight:700}}>ADMemsaab.com</div>
        </div>
        <nav style={{display:'flex',gap:12}}>
          <Link to="/">POS</Link>
          <Link to="/products">Products</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>
      <main style={{padding:16}}>
        <Routes>
          <Route path="/" element={<POS/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/sales" element={<Sales/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </main>
    </div>
  )
}
