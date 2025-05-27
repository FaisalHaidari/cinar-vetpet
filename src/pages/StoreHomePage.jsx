import React, { useState, useEffect } from 'react';
import styles from '../styles/StoreHomePage.module.css';
import { Link } from 'react-router-dom';
import { FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'Proteinli Tahılsız Yetişkin Kedi Maması',
    price: 3000,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    discount: 20,
    freeShipping: true,
    description: 'Yüksek proteinli, tahılsız yetişkin kedi maması',
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Kemik Şeklinde Köpek Oyuncağı',
    price: 3500,
    imageUrl: 'src/images/image_1296.webp',
    description: 'Dayanıklı ve eğlenceli köpek oyuncağı',
    stock: 30,
    rating: 4.2,
    reviews: 85
  },
  { id: 3, name: 'Deri Köpek Boyun Tasması', price: 2500, imageUrl: '/src/images/image_1296.webp', discount: 10 },
  { id: 4, name: 'Köpekler İçin Özel Şampuan', price: 4500, imageUrl: 'src/images/image_1296.webp', freeShipping: true },
  { id: 5, name: 'Kedi Taşıma Kutusu', price: 2200, imageUrl: 'src/images/image_1296.webp' },
  { id: 6, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 1000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 5 },
  { id: 7, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 1000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 5 },
  { id: 8, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 1000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 5 },
];

function StoreHomePage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const newTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const increaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div className={styles.storeHomePage}>
      <div className={styles.mainWrapper}>
        <header className={styles.storeHeader}>
          <h1>Evcil Hayvan Mağazası</h1>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={styles.cartButton}
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <FaShoppingCart />
            <span className={styles.cartCount}>{cart.length}</span>
          </button>
        </header>

        <main className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {filteredProducts.map(product => {
              const [quantity, setQuantity] = useState(1);
              return (
                <div key={product.id} className={styles.productCard}>
                  {product.discount && (
                    <span className={styles.productDiscount}>%{product.discount} İndirim</span>
                  )}
                  {product.freeShipping && (
                    <span className={styles.productFreeShipping}>Ücretsiz Kargo</span>
                  )}
                  <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productPrice}>{product.price.toLocaleString()} TL</div>
                  <div className={styles.quantityControl}>
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button className={styles.addToCartButton} onClick={() => addToCart(product, quantity)}>
                    Sepete Ekle
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {isCartOpen && (
        <div className={styles.cartSidebar}>
          <div className={styles.cartHeader}>
            <h3>Sepetim</h3>
            <button onClick={() => setIsCartOpen(false)} className={styles.closeCart}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h4>{item.name}</h4>
                  <div className={styles.quantityControl}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <div className={styles.priceInfo}>
                    <span className={styles.unitPrice}>{item.price.toLocaleString()} TL</span>
                    <span className={styles.totalPrice}>
                      {(item.price * item.quantity).toLocaleString()} TL
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeItem}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              <span>Toplam:</span>
              <span>{totalPrice.toLocaleString()} TL</span>
            </div>
            {cart.length > 0 ? (
              <Link 
                to="/shipping-info" 
                state={{ cartItems: cart, totalPrice: totalPrice }}
                className={styles.checkoutButton}
              >
                Ödemeye Geç
              </Link>
            ) : (
              <p className={styles.emptyCart}>Sepetiniz boş</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreHomePage;
