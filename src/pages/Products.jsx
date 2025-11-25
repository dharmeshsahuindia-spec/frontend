import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(()=>{ fetchProducts(); }, []);
  async function fetchProducts(){ const r = await API.get('/products'); setProducts(r.data); }

  async function addProduct(e){
    e.preventDefault();
    await API.post('/products', { name, price: Number(price), stock: Number(stock), sku: '' });
    setName(''); setPrice(''); setStock('');
    fetchProducts();
  }

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={addProduct} style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
        <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" />
        <input value={stock} onChange={(e)=>setStock(e.target.value)} placeholder="Stock" />
        <button className="btn">Add</button>
      </form>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
        {products.map(p=>(
          <div key={p.id} className="card">
            <div style={{fontWeight:600}}>{p.name}</div>
            <div style={{color:'#6b7280'}}>₹{Number(p.price).toFixed(2)}</div>
            <div style={{color:'#6b7280'}}>Stock: {p.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
