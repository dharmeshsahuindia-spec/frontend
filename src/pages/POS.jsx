import React, { useEffect, useState, useRef } from 'react';
import API from '../services/api';
import BarcodeScanner from '../components/BarcodeScanner';
import InvoicePrint from '../components/InvoicePrint';
import html2pdf from 'html2pdf.js';

export default function POS(){
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [settings, setSettings] = useState({ store_name: 'ADMemsaab.com', tax_percent:12 });
  const [lastSale, setLastSale] = useState(null);

  useEffect(()=>{ fetchProducts(); fetchSettings(); }, []);
  async function fetchProducts(q=''){
    const res = await API.get('/products', { params:{ q } });
    setProducts(res.data);
  }
  async function fetchSettings(){ const r = await API.get('/settings'); setSettings(r.data); }

  function addToCart(p, qty=1){ setCart(c=>{ const found = c.find(x=>x.id===p.id); if(found) return c.map(x=>x.id===p.id?{...x, qty:x.qty+qty}:x); return [...c, {...p, qty}] }) }
  function updateQty(id, qty){ setCart(c=> c.map(x=> x.id===id?{...x, qty: Math.max(1, qty)}:x)) }
  function removeItem(id){ setCart(c=> c.filter(x=>x.id!==id)) }

  function subtotal(){ return cart.reduce((s,i)=>s + i.price * i.qty,0) }
  function taxAmount(){ return subtotal() * (settings.tax_percent/100) }
  function total(){ return subtotal() + taxAmount() }

  async function checkout(){ if(cart.length===0) return alert('Cart empty');
    const payload = { customer: 'Walk-in', items: cart.map(i=>({ id:i.id, qty:i.qty, price:i.price })), taxPercent: settings.tax_percent, paymentMode: 'CASH' }
    const res = await API.post('/checkout', payload);
    const sale = res.data.sale;
    setLastSale(sale);
    // open PDF in new tab and let user print
    window.open(`${API.defaults.baseURL}/sales/${sale.id}/pdf`, '_blank');
    setCart([]);
  }

  function downloadPDF(){ if(!lastSale) return alert('No invoice'); html2pdf().from(document.getElementById('invoice-print')).save(`${lastSale.invoice_no}.pdf`) }

  return (
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
      <div className="card">
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <input value={query} onChange={(e)=>{ setQuery(e.target.value); fetchProducts(e.target.value) }} placeholder="Search by name / SKU / barcode" style={{flex:1,padding:8,borderRadius:6,border:'1px solid #e5e7eb'}}/>
          <BarcodeScanner onDetected={(code)=>{ setQuery(code); fetchProducts(code) }} />
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
          {products.map(p => (
            <div key={p.id} className="card">
              <div style={{fontWeight:600}}>{p.name}</div>
              <div style={{color:'#6b7280'}}>₹{Number(p.price).toFixed(2)} • Stock: {p.stock}</div>
              <div style={{marginTop:8,display:'flex',gap:8}}>
                <button className="btn" onClick={()=>addToCart(p,1)}>Add</button>
                <button style={{padding:'8px 10px',borderRadius:6}} onClick={()=>addToCart(p,5)}>+5</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Cart</h3>
        <div style={{maxHeight:300,overflow:'auto',marginTop:8}}>
          {cart.map(i=> (
            <div key={i.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #f3f4f6',padding:'8px 0'}}>
              <div>
                <div>{i.name}</div>
                <div style={{color:'#6b7280'}}>₹{i.price.toFixed(2)} x {i.qty}</div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input style={{width:60}} type="number" value={i.qty} onChange={(e)=>updateQty(i.id, Number(e.target.value))} />
                <button onClick={()=>removeItem(i.id)}>Del</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:12}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>Subtotal <div>₹{subtotal().toFixed(2)}</div></div>
          <div style={{display:'flex',justifyContent:'space-between'}}>Tax ({settings.tax_percent}%) <div>₹{taxAmount().toFixed(2)}</div></div>
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:700}}>Total <div>₹{total().toFixed(2)}</div></div>

          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="btn" style={{flex:1}} onClick={checkout}>Checkout & Print</button>
            <button onClick={downloadPDF} style={{padding:'8px 12px'}}>Download</button>
          </div>
        </div>
      </div>

      <div style={{gridColumn:'1 / -1',marginTop:12}}>
        <div id="invoice-print" style={{display:lastSale?'block':'none'}}>
          {/* Invoice HTML render for html2pdf if needed */}
          <div style={{width:320,fontFamily:'sans-serif',padding:8,border:'1px solid #eee',background:'#fff'}}>
            <div style={{textAlign:'center'}}><h3>{settings.store_name}</h3></div>
            <div>Invoice: {lastSale && lastSale.invoice_no}</div>
            <div>Date: {lastSale && new Date(lastSale.date).toLocaleString()}</div>
            <table style={{width:'100%',marginTop:8}}>
              <tbody>
                {lastSale && lastSale.items.map(it=>(
                  <tr key={it.id}><td>{it.name}</td><td style={{textAlign:'center'}}>{it.qty}</td><td style={{textAlign:'right'}}>₹{it.price.toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{textAlign:'right',fontWeight:700,marginTop:8}}>Total: ₹{lastSale && lastSale.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
