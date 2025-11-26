import React from 'react';
export default function CartPanel({cart, onChangeQty, onRemove, onCheckout, settings}){
  const subtotal = cart.reduce((s,i)=>s + i.price*i.qty,0);
  const tax = subtotal * (settings?.tax_percent || 0)/100;
  const total = subtotal + tax;
  return (
    <div className="card cart-panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontWeight:700}}>Cart</div><div style={{background:'#ff7a00',color:'#fff',padding:'6px 10px',borderRadius:8}}>{cart.length} items</div></div>
      <div style={{maxHeight:360,overflow:'auto',marginTop:8}}>
        {cart.length===0 && <div style={{padding:20,textAlign:'center',color:'#9ca3af'}}>Cart is empty</div>}
        {cart.map(it=>(
          <div key={it.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f3f4f6'}}>
            <div>
              <div style={{fontWeight:700}}>{it.name}</div>
              <div style={{fontSize:12,color:'#6b7280'}}>₹{it.price.toFixed(2)} x {it.qty}</div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <button onClick={()=>onChangeQty(it.id, it.qty-1)} style={{padding:6}}>-</button>
              <div style={{width:36,textAlign:'center'}}>{it.qty}</div>
              <button onClick={()=>onChangeQty(it.id, it.qty+1)} style={{padding:6}}>+</button>
              <button onClick={()=>onRemove(it.id)} style={{marginLeft:8}}>Del</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>Subtotal <div>₹{subtotal.toFixed(2)}</div></div>
        <div style={{display:'flex',justifyContent:'space-between'}}>Tax <div>₹{tax.toFixed(2)}</div></div>
        <div style={{display:'flex',justifyContent:'space-between',fontWeight:700}}>Total <div>₹{total.toFixed(2)}</div></div>
        <div style={{marginTop:12}}><button className="btn" onClick={onCheckout}>Checkout & Print</button></div>
      </div>
    </div>
  )
}
