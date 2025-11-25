import React from 'react';

export default function InvoicePrint({ invoice, store }){
  if(!invoice) return null;
  return (
    <div id="invoice-print" style={{width:320,fontFamily:'sans-serif',padding:8,background:'#fff'}}>
      <div style={{textAlign:'center'}}>
        {store.logo_path && <img src={store.logo_path} alt="logo" style={{maxWidth:120}} />}
        <h3>{store.store_name}</h3>
        <div style={{color:'#6b7280'}}>{store.address}</div>
        <div style={{color:'#6b7280'}}>Phone: {store.phone}</div>
      </div>
      <div style={{marginTop:8}}>Invoice: {invoice.invoice_no}</div>
      <div>Date: {new Date(invoice.date).toLocaleString()}</div>
      <table style={{width:'100%',marginTop:8}}>
        <tbody>
          {invoice.items.map(it=>(
            <tr key={it.id}><td>{it.name}</td><td style={{textAlign:'center'}}>{it.qty}</td><td style={{textAlign:'right'}}>₹{it.price.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
      <div style={{textAlign:'right',fontWeight:700,marginTop:8}}>Total: ₹{invoice.total.toFixed(2)}</div>
    </div>
  );
}
