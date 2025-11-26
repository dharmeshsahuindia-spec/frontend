import React from 'react';
import { Link } from 'react-router-dom';
export default function Sidebar(){
  return (
    <aside className="sidebar">
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        <Link to="/pos">POS</Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  )
}
