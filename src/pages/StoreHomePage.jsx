import React, { useState, useEffect } from 'react';
import styles from '../styles/StoreHomePage.module.css';
import { Link } from 'react-router-dom';
import { FaTimes, FaSearch, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  { 
    id: 3, 
    name: 'Deri Köpek Boyun Tasması', 
    price: 2500, 
    imageUrl: '/src/images/image_1296.webp', 
    discount: 10,
    description: 'Kaliteli deri köpek tasması',
    stock: 25,
    rating: 4.0,
    reviews: 45
  },
  { 
    id: 4, 
    name: 'Köpekler İçin Özel Şampuan', 
    price: 4500, 
    imageUrl: 'src/images/image_1296.webp', 
    freeShipping: true,
    description: 'Hassas ciltler için özel formül',
    stock: 40,
    rating: 4.7,
    reviews: 92
  },
  { 
    id: 5, 
    name: 'Kedi Taşıma Kutusu', 
    price: 2200, 
    imageUrl: 'src/images/image_1296.webp',
    description: 'Konforlu ve dayanıklı kedi taşıma çantası',
    stock: 15,
    rating: 4.3,
    reviews: 38
  },
  { 
    id: 6, 
    name: 'Tavuk Aromalı Köpek Ödül Maması', 
    price: 1000, 
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', 
    discount: 5,
    description: 'Eğitim için ideal ödül maması',
    stock: 100,
    rating: 4.8,
    reviews: 156
  },
  { 
    id: 7, 
    name: 'Kedi Tırmalama Tahtası', 
    price: 1800, 
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Doğal malzemelerden üretilmiş tırmalama tahtası',
    stock: 35,
    rating: 4.4,
    reviews: 67
  },
  { 
    id: 8, 
    name: 'Köpek Yatağı', 
    price: 2800, 
    imageUrl: '/src/images/image_1296.webp',
    description: 'Yıkanabilir ve konforlu köpek yatağı',
    stock: 20,
    rating: 4.6,
    reviews: 48
  },
  {
    id: 9,
    name: 'Kedi Kumu ve Küreği',
    price: 1500,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Koku giderici özellikli kedi kumu seti',
    stock: 45,
    rating: 4.2,
    reviews: 89
  },
  {
    id: 10,
    name: 'Köpek Diş Fırçası Seti',
    price: 1200,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Diş sağlığı için özel fırça ve macun seti',
    stock: 30,
    rating: 4.1,
    reviews: 42
  },
  {
    id: 11,
    name: 'Kedi Vitamin Takviyesi',
    price: 850,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    discount: 15,
    description: 'Bağışıklık sistemini güçlendiren vitamin takviyesi',
    stock: 60,
    rating: 4.5,
    reviews: 73
  },
  {
    id: 12,
    name: 'Köpek Tasma Seti',
    price: 3200,
    imageUrl: '/src/images/image_1296.webp',
    freeShipping: true,
    description: 'Ayarlanabilir tasma ve kayış seti',
    stock: 25,
    rating: 4.7,
    reviews: 58
  },
  {
    id: 13,
    name: 'Kedi Tırmalama Direği',
    price: 2800,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Çok seviyeli kedi tırmalama direği',
    stock: 15,
    rating: 4.6,
    reviews: 42
  },
  {
    id: 14,
    name: 'Köpek Eğitim Tasması',
    price: 1800,
    imageUrl: '/src/images/image_1296.webp',
    discount: 10,
    description: 'Profesyonel eğitim tasması',
    stock: 30,
    rating: 4.3,
    reviews: 65
  },
  {
    id: 15,
    name: 'Kedi Oyuncak Seti',
    price: 950,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: '6 parçalı kedi oyuncak seti',
    stock: 50,
    rating: 4.4,
    reviews: 88
  },
  {
    id: 16,
    name: 'Köpek Mama Kabı Seti',
    price: 750,
    imageUrl: '/src/images/image_1296.webp',
    freeShipping: true,
    description: 'Paslanmaz çelik mama ve su kabı seti',
    stock: 40,
    rating: 4.5,
    reviews: 72
  },
  {
    id: 17,
    name: 'Kedi Tırmalama Matı',
    price: 650,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Yıkanabilir tırmalama matı',
    stock: 35,
    rating: 4.2,
    reviews: 45
  },
  {
    id: 18,
    name: 'Köpek Şampuanı',
    price: 850,
    imageUrl: '/src/images/image_1296.webp',
    discount: 5,
    description: 'Hassas ciltler için özel şampuan',
    stock: 45,
    rating: 4.4,
    reviews: 63
  },
  {
    id: 19,
    name: 'Kedi Tarak Seti',
    price: 550,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Profesyonel tüy bakım seti',
    stock: 30,
    rating: 4.3,
    reviews: 52
  },
  {
    id: 20,
    name: 'Köpek Vitamin Takviyesi',
    price: 1200,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Eklem sağlığı için vitamin takviyesi',
    stock: 25,
    rating: 4.6,
    reviews: 48
  },
  {
    id: 21,
    name: 'Kedi Mama Kabı',
    price: 450,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    freeShipping: true,
    description: 'Ağırlıklı mama kabı',
    stock: 40,
    rating: 4.2,
    reviews: 38
  },
  {
    id: 22,
    name: 'Köpek Oyuncak Topu',
    price: 350,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Dayanıklı kauçuk top',
    stock: 60,
    rating: 4.5,
    reviews: 82
  },
  {
    id: 23,
    name: 'Kedi Vitaminli Ödül',
    price: 280,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    discount: 15,
    description: 'Vitamin takviyeli kedi ödülü',
    stock: 70,
    rating: 4.4,
    reviews: 65
  },
  {
    id: 24,
    name: 'Köpek Eğitim Clickeri',
    price: 180,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Profesyonel eğitim clickeri',
    stock: 45,
    rating: 4.3,
    reviews: 58
  },
  {
    id: 25,
    name: 'Kedi Tırmalama Tüneli',
    price: 2200,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Katlanabilir oyun tüneli',
    stock: 20,
    rating: 4.7,
    reviews: 42
  },
  {
    id: 26,
    name: 'Köpek Yürüyüş Kayışı',
    price: 850,
    imageUrl: '/src/images/image_1296.webp',
    freeShipping: true,
    description: 'Ayarlanabilir yürüyüş kayışı',
    stock: 35,
    rating: 4.5,
    reviews: 68
  },
  {
    id: 27,
    name: 'Kedi Vitaminli Mama',
    price: 1800,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    discount: 10,
    description: 'Vitamin takviyeli kedi maması',
    stock: 40,
    rating: 4.6,
    reviews: 75
  },
  {
    id: 28,
    name: 'Köpek Tırmalama Fırçası',
    price: 450,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Profesyonel tüy bakım fırçası',
    stock: 30,
    rating: 4.4,
    reviews: 52
  },
  {
    id: 29,
    name: 'Kedi Oyuncak Fare',
    price: 280,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    description: 'Sesli oyuncak fare',
    stock: 50,
    rating: 4.3,
    reviews: 45
  },
  {
    id: 30,
    name: 'Köpek Vitaminli Ödül',
    price: 350,
    imageUrl: '/src/images/image_1296.webp',
    discount: 5,
    description: 'Vitamin takviyeli köpek ödülü',
    stock: 65,
    rating: 4.5,
    reviews: 88
  },
  {
    id: 31,
    name: 'Kedi Mama Kabı Seti',
    price: 950,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    freeShipping: true,
    description: 'Çiftli mama ve su kabı seti',
    stock: 25,
    rating: 4.4,
    reviews: 62
  },
  {
    id: 32,
    name: 'Köpek Tırmalama Eldiveni',
    price: 550,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Masaj ve tüy bakım eldiveni',
    stock: 40,
    rating: 4.6,
    reviews: 72
  },
  {
    id: 33,
    name: 'Kedi Vitaminli Şampuan',
    price: 750,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    discount: 15,
    description: 'Vitamin takviyeli kedi şampuanı',
    stock: 30,
    rating: 4.3,
    reviews: 48
  },
  {
    id: 34,
    name: 'Köpek Oyuncak Kemik',
    price: 420,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Dayanıklı kauçuk kemik',
    stock: 45,
    rating: 4.5,
    reviews: 65
  },
  {
    id: 35,
    name: 'Kedi Tırmalama Yatağı',
    price: 1800,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    freeShipping: true,
    description: 'Yumuşak tırmalama yatağı',
    stock: 20,
    rating: 4.7,
    reviews: 42
  },
  {
    id: 36,
    name: 'Köpek Vitaminli Mama',
    price: 2200,
    imageUrl: '/src/images/image_1296.webp',
    description: 'Vitamin takviyeli köpek maması',
    stock: 35,
    rating: 4.6,
    reviews: 78
  }
];

function StoreHomePage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const newTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <h1>Pet Shop</h1>
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
            {currentProducts.map(product => {
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

          {/* Pagination */}
          <div className={styles.pagination}>
            <button 
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
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
