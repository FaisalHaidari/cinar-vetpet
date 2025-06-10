import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import FaHeart if used for favorites
import BackButton from '../components/BackButton';
import styles from '../styles/StorePage.module.css'; // Import the CSS module
import { useCart } from '../hooks/CartContext'; // Import useCart again

export default function StoreCategorySaglik() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Use addToCart from context

  useEffect(() => {
    // Fetch products for this category
    fetch(`${import.meta.env.VITE_API_URL}/urunler?category=Sağlık ve Veteriner Ürünleri`) // Correct category name
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Use addToCart from context
  };

  const toggleFavorite = (productId) => {
    // Implement favorite functionality if needed, or remove if not used
    console.log('Toggle favorite for product:', productId);
  };

  return (
    <div style={{padding:40}} className={styles.storePage}> {/* Apply storePage class */}
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
        <BackButton />
        <h1 style={{color:'#f7882f',fontWeight:800,fontSize:32,margin:0,flex:1,textAlign:'center'}}>Sağlık و Veteriner Ürünleri</h1>
      </div>
      {/* Apply productsGrid class for layout */}
      <div className={styles.productsGrid}>
        {products.map(p => (
          <div key={p.id} className={styles.productCard}> {/* Apply productCard class */}
            <div className={styles.productImage}> {/* Apply productImage class */}
              {p.image && <img src={p.image} alt={p.name} />}
              {/* Add discount/shipping badges if applicable to this data */}
              {/* Example: {p.discount && (<span className={styles.discountBadge}>%{p.discount} İndirim</span>)} */}
              {/* Example: {p.freeShipping && (<span className={styles.shippingBadge}>Ücretsiz Kargo</span>)} */}
              {/* Add favorite button if needed */}
              {/* Example: <button className={styles.favoriteButton} onClick={() => toggleFavorite(p.id)}><FaHeart /></button> */}
            </div>
            <div className={styles.productInfo}> {/* Apply productInfo class */}
              <h3 style={{fontWeight:700,fontSize:20,marginBottom:8}}>{p.name}</h3>
              {/* Add rating if applicable to this data */}
              {/* Example: {p.rating && (<div className={styles.rating}>{p.rating} <FaStar /> <span>({p.reviews} yorum)</span></div>)} */}
              <div style={{color:'#388e3c',fontWeight:700,fontSize:18}}>{p.price} TL</div>
              {/* Add Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(p)} // Keep onClick
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
                  width: '100%' // Make button full width of card
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
  );
} 