import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import BackButton from '../components/BackButton';
import styles from '../styles/StorePage.module.css';
import { useCart } from '../hooks/CartContext';

export default function StoreCategoryOyuncaklar() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/urunler?category=Oyuncaklar`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const toggleFavorite = (productId) => {
    console.log('Toggle favorite for product:', productId);
  };

  return (
    <>
      <div style={{padding:40}} className={styles.storePage}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
          <BackButton />
          <h1 style={{color:'#f7882f',fontWeight:800,fontSize:32,margin:0,flex:1,textAlign:'center'}}>Oyuncaklar</h1>
        </div>
        <div className={styles.productsGrid}>
          {products.map(p => (
            <div key={p.id} className={styles.productCard}>
              <div className={styles.productImage}>
                {p.image && <img src={p.image} alt={p.name} />}
              </div>
              <div className={styles.productInfo}>
                <h3 style={{fontWeight:700,fontSize:20,marginBottom:8}}>{p.name}</h3>
                <div style={{color:'#388e3c',fontWeight:700,fontSize:18}}>{p.price} TL</div>
                <button
                  onClick={() => handleAddToCart(p)}
                  style={{
                    background: '#f7882f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '10px',
                    transition: 'background-color 0.2s ease',
                    width: '100%'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e07b2e'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f7882f'}
                >
                  <FaShoppingCart style={{marginRight: '8px'}} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && <div style={{color:'#888',fontSize:18}}>Bu kategoride ürün yok.</div>}
        </div>
      </div>
    </>
  );
} 