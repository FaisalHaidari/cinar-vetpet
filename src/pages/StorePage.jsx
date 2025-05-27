import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaShoppingCart, FaHeart, FaSearch, FaTimes } from 'react-icons/fa';
import styles from '../styles/StorePage.module.css';

const categories = [
  { id: 'all', name: 'Tüm Ürünler' },
  { id: 'dog', name: 'Köpek' },
  { id: 'cat', name: 'Kedi' },
  { id: 'fish', name: 'Balık' },
  { id: 'bird', name: 'Kuş' },
];

const products = [
  { 
    id: 1, 
    name: 'Proteinli Tahılsız Yetişkin Kedi Maması', 
    price: 3000, 
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', 
    discount: 20, 
    freeShipping: true,
    category: 'cat',
    rating: 4.5,
    reviews: 128,
    stock: 15,
    description: 'Yüksek proteinli, tahılsız yetişkin kedi maması. Doğal içeriklerle üretilmiştir.'
  },
  { 
    id: 2, 
    name: 'Kemik Şeklinde Köpek Oyuncağı', 
    price: 3500, 
    imageUrl: '/src/images/image_1296.webp',
    category: 'dog',
    rating: 4.2,
    reviews: 85,
    stock: 20,
    description: 'Dayanıklı ve güvenli köpek oyuncağı. Diş sağlığına yardımcı olur.'
  },
  { 
    id: 3, 
    name: 'Deri Köpek Boyun Tasması', 
    price: 2500, 
    imageUrl: '/src/images/image_1296.webp', 
    discount: 10,
    category: 'dog',
    rating: 4.8,
    reviews: 156,
    stock: 8,
    description: 'Yüksek kaliteli deri köpek tasması. Ayarlanabilir tokalı.'
  },
  { 
    id: 4, 
    name: 'Köpekler İçin Özel Şampuan', 
    price: 4500, 
    imageUrl: '/src/images/image_1296.webp', 
    freeShipping: true,
    category: 'dog',
    rating: 4.3,
    reviews: 92,
    stock: 25,
    description: 'Hassas ciltler için özel formüllü köpek şampuanı.'
  },
  // Add more products as needed
];

function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let result = products;

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId) => {
    // Implement favorite functionality
  };

  return (
    <div className={styles.storePage}>
      {/* Search and Filter Bar */}
      <div className={styles.searchFilterBar}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filtreler
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="default">Sıralama</option>
          <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
          <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
          <option value="rating">En Çok Değerlendirilenler</option>
        </select>
      </div>

      {/* Filters Sidebar */}
      <div className={`${styles.filtersSidebar} ${showFilters ? styles.show : ''}`}>
        <button
          className={styles.closeFilters}
          onClick={() => setShowFilters(false)}
        >
          <FaTimes />
        </button>
        <div className={styles.filterSection}>
          <h3>Kategoriler</h3>
          <div className={styles.categoryList}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3>Fiyat Aralığı</h3>
          <div className={styles.priceRange}>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
            />
            <div className={styles.priceInputs}>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.imageUrl} alt={product.name} />
              {product.discount && (
                <span className={styles.discountBadge}>%{product.discount} İndirim</span>
              )}
              {product.freeShipping && (
                <span className={styles.shippingBadge}>Ücretsiz Kargo</span>
              )}
              <button
                className={styles.favoriteButton}
                onClick={() => toggleFavorite(product.id)}
              >
                <FaHeart />
              </button>
            </div>
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <div className={styles.rating}>
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
                <span>({product.reviews})</span>
              </div>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.priceContainer}>
                {product.discount ? (
                  <>
                    <span className={styles.originalPrice}>
                      {(product.price * (1 + product.discount / 100)).toLocaleString()} TL
                    </span>
                    <span className={styles.discountedPrice}>
                      {product.price.toLocaleString()} TL
                    </span>
                  </>
                ) : (
                  <span className={styles.price}>{product.price.toLocaleString()} TL</span>
                )}
              </div>
              <div className={styles.stockInfo}>
                {product.stock > 0 ? (
                  <span className={styles.inStock}>Stokta {product.stock} adet</span>
                ) : (
                  <span className={styles.outOfStock}>Stokta Yok</span>
                )}
              </div>
              <button
                className={styles.addToCartButton}
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                <FaShoppingCart /> Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Preview */}
      {cart.length > 0 && (
        <div className={styles.cartPreview}>
          <div className={styles.cartHeader}>
            <h3>Sepetim ({cart.length} ürün)</h3>
            <button className={styles.closeCart}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} />
                <div className={styles.cartItemInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.quantity} x {item.price.toLocaleString()} TL</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartTotal}>
            <span>Toplam:</span>
            <span>
              {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} TL
            </span>
          </div>
          <button className={styles.checkoutButton}>
            Siparişi Tamamla
          </button>
        </div>
      )}
    </div>
  );
}

export default StorePage; 