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
  { id: 1, name: 'Proteinli Tahılsız Yetişkin Kedi Maması', price: 3000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 20, freeShipping: true, category: 'cat', rating: 4.5, reviews: 128, stock: 15, description: 'Yüksek proteinli, tahılsız yetişkin kedi maması. Doğal içeriklerle üretilmiştir.' },
  { id: 2, name: 'Kemik Şeklinde Köpek Oyuncağı', price: 3500, imageUrl: '/src/images/image_1296.webp', category: 'dog', rating: 4.2, reviews: 85, stock: 20, description: 'Dayanıklı ve güvenli köpek oyuncağı. Diş sağlığına yardımcı olur.' },
  { id: 3, name: 'Deri Köpek Boyun Tasması', price: 2500, imageUrl: '/src/images/image_1296.webp', discount: 10, category: 'dog', rating: 4.8, reviews: 156, stock: 8, description: 'Yüksek kaliteli deri köpek tasması. Ayarlanabilir tokalı.' },
  { id: 4, name: 'Köpekler İçin Özel Şampuan', price: 4500, imageUrl: '/src/images/image_1296.webp', freeShipping: true, category: 'dog', rating: 4.3, reviews: 92, stock: 25, description: 'Hassas ciltler için özel formüllü köpek şampuanı.' },
  { id: 5, name: 'Kedi Taşıma Kutusu', price: 2200, imageUrl: '/src/images/image_1296.webp', category: 'cat', rating: 4.1, reviews: 60, stock: 12, description: 'Dayanıklı ve konforlu kedi taşıma kutusu.' },
  { id: 6, name: 'Balık Yemi', price: 500, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', category: 'fish', rating: 4.7, reviews: 40, stock: 30, description: 'Vitaminli balık yemi.' },
  { id: 7, name: 'Kuş Kafesi', price: 1800, imageUrl: '/src/images/image_1296.webp', category: 'bird', rating: 4.0, reviews: 22, stock: 10, description: 'Geniş ve ferah kuş kafesi.' },
  { id: 8, name: 'Kedi Tırmalama Tahtası', price: 900, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', category: 'cat', rating: 4.6, reviews: 33, stock: 18, description: 'Kediler için tırmalama tahtası.' },
  { id: 9, name: 'Köpek Mama Kabı', price: 400, imageUrl: '/src/images/image_1296.webp', category: 'dog', rating: 4.3, reviews: 27, stock: 22, description: 'Paslanmaz çelik köpek mama kabı.' },
  { id: 10, name: 'Kedi Oyuncağı', price: 350, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', category: 'cat', rating: 4.8, reviews: 44, stock: 25, description: 'Renkli ve eğlenceli kedi oyuncağı.' },
  { id: 11, name: 'Kuş Yemi', price: 200, imageUrl: '/src/images/image_1296.webp', category: 'bird', rating: 4.2, reviews: 19, stock: 40, description: 'Vitaminli kuş yemi.' },
  { id: 12, name: 'Balık Akvaryumu', price: 3200, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', category: 'fish', rating: 4.9, reviews: 12, stock: 5, description: 'Orta boy cam akvaryum.' },
  { id: 13, name: 'Köpek Tasma Seti', price: 1700, imageUrl: '/src/images/image_1296.webp', category: 'dog', rating: 4.4, reviews: 38, stock: 14, description: 'Ayarlanabilir köpek tasma seti.' },
  { id: 14, name: 'Kedi Tuvaleti', price: 1100, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', category: 'cat', rating: 4.5, reviews: 29, stock: 16, description: 'Kapalı kedi tuvaleti.' },
  { id: 15, name: 'Kuş Oyuncağı', price: 250, imageUrl: '/src/images/image_1296.webp', category: 'bird', rating: 4.1, reviews: 15, stock: 35, description: 'Renkli kuş oyuncağı.' },
  { id: 16, name: 'Balık Akvaryum Filtresi', price: 800, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', category: 'fish', rating: 4.6, reviews: 21, stock: 8, description: 'Sessiz çalışan akvaryum filtresi.' },
  // ...
  // Duplicate and slightly vary the above products to reach 48 total
  ...Array.from({ length: 44 }, (_, i) => ({
    id: i + 5,
    name: `Ürün ${i + 5}`,
    price: 1000 + (i % 8) * 250,
    imageUrl: i % 2 === 0 ? '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp' : '/src/images/image_1296.webp',
    discount: i % 3 === 0 ? 5 : undefined,
    freeShipping: i % 4 === 0,
    category: ['cat', 'dog', 'fish', 'bird'][i % 4],
    rating: 4 + (i % 5) * 0.2,
    reviews: 10 + (i * 7) % 100,
    stock: 5 + (i * 3) % 30,
    description: `Açıklama örneği ürün ${i + 5}`
  }))
];

function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 16;
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

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
      {/* Main Title */}
      <h1 style={{
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 900,
        color: '#1a237e',
        margin: '2.5rem 0 2.5rem 0',
        fontFamily: 'Montserrat, Arial, sans-serif',
        letterSpacing: 1
      }}>Pet Shop</h1>

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
          <h3>Ürün Kategorileri</h3>
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
        {paginatedProducts.map(product => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0 2rem 0', gap: '1rem' }}>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              style={{
                background: currentPage === idx + 1 ? '#F7882F' : '#fff',
                color: currentPage === idx + 1 ? '#fff' : '#6B7A8F',
                border: '2px solid #F7882F',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 18,
                padding: '0.7em 1.5em',
                cursor: 'pointer',
                boxShadow: currentPage === idx + 1 ? '0 2px 8px rgba(44,62,80,0.10)' : 'none',
                transition: 'all 0.2s',
                outline: 'none',
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

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