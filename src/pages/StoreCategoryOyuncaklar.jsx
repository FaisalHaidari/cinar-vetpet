import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function StoreCategoryOyuncaklar() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/urunler?category=Oyuncaklar')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  return (
    <div style={{padding:40}}>
      <h1 style={{color:'#f7882f',fontWeight:800,fontSize:32}}>Oyuncaklar</h1>
      <div style={{display:'flex',flexWrap:'wrap',gap:32,marginTop:32}}>
        {products.map(p => (
          <div key={p.id} style={{background:'#fff',borderRadius:14,boxShadow:'0 2px 8px #eee',padding:24,minWidth:220,maxWidth:260,textAlign:'center'}}>
            {p.image && <img src={p.image} alt={p.name} style={{width:120,height:120,objectFit:'cover',borderRadius:10,marginBottom:12}} />}
            <div style={{fontWeight:700,fontSize:20,marginBottom:8}}>{p.name}</div>
            <div style={{color:'#388e3c',fontWeight:700,fontSize:18}}>{p.price} TL</div>
          </div>
        ))}
        {products.length === 0 && <div style={{color:'#888',fontSize:18}}>Bu kategoride ürün yok.</div>}
      </div>
    </div>
  );
} 