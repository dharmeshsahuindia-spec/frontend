import React from 'react';
export default function ProductCard({p, onAdd}){
  return (
    <div className="product" onClick={()=>onAdd(p)}>
      <div style={{fontWeight:700}}>{p.name}</div>
      <div style={{color:'#6b7280'}}>₹{Number(p.price).toFixed(2)}</div>
      <div style={{fontSize:12,color:'#9ca3af',marginTop:6}}>Stock: {p.stock ?? 0}</div>
    </div>
  )
}
