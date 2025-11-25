import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Sales(){
  const [sales, setSales] = useState([]);
  useEffect(()=>{ fetchSales(); }, []);
  async function fetchSales(){ const r = await API.get('/sales'); setSales(r.data); }

  return (
    <div>
      <h2>Sales</h2>
      <div style={{display:'grid',gap:8}}>
        {sales.map(s=>(
          <div key={s.id} className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{s.invoice_no}</div>
              <div style={{color:'#6b7280'}}>{new Date(s.date).toLocaleString()}</div>
            </div>
            <div>
              <a href={'/api/sales/'+s.id+'/pdf'} target="_blank" rel="noreferrer">Open PDF</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
