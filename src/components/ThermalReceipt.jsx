import React from 'react';
export default function ThermalReceipt({sale, settings}){
  if(!sale) return null;
  return (
    <div className="thermal" id="thermal-receipt">
      <div style={{textAlign:'center',fontWeight:700,fontSize:16}}>{settings?.store_name || 'ADMemsaab'}</div>
      <div style={{textAlign:'center',fontSize:12}}>{settings?.address || ''}</div>
      <div style={{marginTop:6,borderTop:'1px dashed #000'}}></div>
      <div style={{marginTop:8}}>
        <div>Invoice: {sale.invoice_no}</div>
        <div>Date: {new Date(sale.date).toLocaleString()}</div>
        <div style={{marginTop:6,borderTop:'1px dashed #000'}} />
      </div>
      <table style={{width:'100%',marginTop:8}}>
        <tbody>
          {sale.items.map(it=>(
            <tr key={it.id}><td>{it.name}</td><td style={{textAlign:'center'}}>{it.qty}</td><td style={{textAlign:'right'}}>₹{(it.price*it.qty).toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:8,borderTop:'1px dashed #000'}} />
      <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}><div>Subtotal</div><div>₹{sale.subtotal.toFixed(2)}</div></div>
      <div style={{display:'flex',justifyContent:'space-between'}}><div>Tax</div><div>₹{sale.tax.toFixed(2)}</div></div>
      <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,marginTop:6,fontSize:16}}><div>TOTAL</div><div>₹{sale.total.toFixed(2)}</div></div>
      <div style={{marginTop:10,borderTop:'1px dashed #000'}} />
      <div style={{textAlign:'center',marginTop:8}}>Thank you! Visit Again</div>
    </div>
  )
}
