import React from 'react';
export default function Header(){
  return (
    <header className="header">
      <div className="brand"><img src="/logo.png" alt="logo" style={{height:36}}/> ADMemsaab</div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <div style={{color:'#6b7280'}}>Logged as Admin</div>
      </div>
    </header>
  )
}
