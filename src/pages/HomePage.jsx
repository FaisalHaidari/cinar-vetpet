import React from 'react';
import { Link } from 'react-router-dom';
import { FaDog, FaCat, FaFish, FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import styles from '../styles/HomePage.module.css';

const categories = [
  { id: 1, name: 'Köpek', icon: <FaDog />, image: '/src/images/dog-category.jpg' },
  { id: 2, name: 'Kedi', icon: <FaCat />, image: '/src/images/cat-category.jpg' },
  { id: 3, name: 'Balık', icon: <FaFish />, image: '/src/images/fish-category.jpg' },
];

const featuredProducts = [
  { id: 1, name: 'Proteinli Tahılsız Yetişkin Kedi Maması', price: 3000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 20, freeShipping: true },
  { id: 2, name: 'Kemik Şeklinde Köpek Oyuncağı', price: 3500, imageUrl: '/src/images/image_1296.webp' },
  { id: 3, name: 'Deri Köpek Boyun Tasması', price: 2500, imageUrl: '/src/images/image_1296.webp', discount: 10 },
  { id: 4, name: 'Köpekler İçin Özel Şampuan', price: 4500, imageUrl: '/src/images/image_1296.webp', freeShipping: true },
];

function HomePage() {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Evcil Hayvanlarınız İçin En İyi Ürünler</h1>
          <p>Kaliteli mama, oyuncak ve bakım ürünleri ile evcil dostlarınızı mutlu edin</p>
          <Link to="/store" className={styles.heroButton}>
            Alışverişe Başla
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2>Kategoriler</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link to={`/category/${category.id}`} key={category.id} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featuredProducts}>
        <h2>Öne Çıkan Ürünler</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.imageUrl} alt={product.name} />
                {product.discount && (
                  <span className={styles.discountBadge}>%{product.discount} İndirim</span>
                )}
                {product.freeShipping && (
                  <span className={styles.shippingBadge}>Ücretsiz Kargo</span>
                )}
                <button className={styles.favoriteButton}>
                  <FaHeart />
                </button>
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
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
                <button className={styles.addToCartButton}>
                  <FaShoppingCart /> Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className={styles.specialOffers}>
        <div className={styles.offerCard}>
          <div className={styles.offerContent}>
            <h3>İlk Siparişinize Özel</h3>
            <p>%20 İndirim</p>
            <Link to="/store" className={styles.offerButton}>
              Hemen Alışverişe Başla
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Bültenimize Katılın</h2>
          <p>En yeni ürünler ve özel tekliflerden haberdar olun</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="E-posta adresiniz" />
            <button type="submit">Abone Ol</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage;