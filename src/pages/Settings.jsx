import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Settings(){
  const [settings, setSettings] = useState({});
  const [storeName, setStoreName] = useState('');
  const [tax, setTax] = useState(12);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  useEffect(()=>{ fetchSettings(); }, []);
  async function fetchSettings(){ const r = await API.get('/settings'); setSettings(r.data); setStoreName(r.data.store_name); setTax(r.data.tax_percent); setAddress(r.data.address||''); setPhone(r.data.phone||''); }

  async function save(e){
    e.preventDefault();
    const fd = new FormData();
    fd.append('store_name', storeName);
    fd.append('tax_percent', tax);
    fd.append('address', address);
    fd.append('phone', phone);
    if(logoFile) fd.append('logo', logoFile);
    const r = await API.post('/settings', fd);
    alert('Saved');
    fetchSettings();
  }

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={save} style={{display:'grid',gap:8,maxWidth:600}}>
        <input value={storeName} onChange={(e)=>setStoreName(e.target.value)} placeholder="Store name" />
        <input value={tax} onChange={(e)=>setTax(e.target.value)} placeholder="Tax percent" />
        <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" />
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" />
        <input type="file" onChange={(e)=>setLogoFile(e.target.files[0])} />
        <button className="btn">Save</button>
      </form>
    </div>
  );
}
