import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

const services = [
  { id: 1, title: 'Cerrahi Hizmetler', icon: '🩺', desc: ' ' },
  { id: 2, title: 'Ortopedi', icon: '🦴', desc: '' },
  { id: 3, title: 'Dahiliye', icon: '💊', desc: ' ' },
  { id: 7, title: 'Mrg', icon: '📈', desc: ' ' },
  { id: 8, title: 'Endoskopi', icon: '💉', desc: ' ' },
  { id: 9, title: 'Yoğun Bakım', icon: '🩹', desc: '' },
];

const petShopProducts = [
  { id: 1, title: 'Oyuncaklar', image: '/images/oyuncu.jpg', desc: 'Kedi ve köpek oyuncakları', link: '/petshop/oyuncaklar' },
  { id: 2, title: 'Sağlık ve Veteriner Ürünleri', image: '/images/saglik.jpg', desc: 'Sağlık ürünleri', link: '/petshop/saglik' },
  { id: 3, title: 'Kafesler ve Barınaklar', image: '/images/kafesler-ve-barinaklsar-1024x680.jpg', desc: 'Kafes ve barınak çeşitleri', link: '/petshop/kafesler' },
  { id: 4, title: 'Mama ve Besin Ürünleri', image: '/images/mamsi.png', desc: 'Kedi ve köpek mamaları', link: '/petshop/Mama ve Besin Ürünleri' },
];

const featuredProducts = [
  { id: 1, name: 'Ürün 1', imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp' },
  { id: 2, name: 'Ürün 2', imageUrl: '/images/image_1296.webp' },
  { id: 3, name: 'Ürün 3', imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp' },
  { id: 4, name: 'Ürün 4', imageUrl: '/images/image_1296.webp' },
  { id: 5, name: 'Ürün 5', imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp' },
  { id: 6, name: 'Ürün 6', imageUrl: '/images/image_1296.webp' },
  { id: 7, name: 'Ürün 7', imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp' },
  { id: 8, name: 'Ürün 8', imageUrl: '/images/image_1296.webp' },
];

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const petShopSliderRef = React.useRef(null);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('scroll') === 'petshop') {
      window.scrollTo({ top: document.getElementById('petshop').offsetTop - 80, behavior: 'smooth' });
    }
  }, [location]);

  React.useEffect(() => {
    const slider = petShopSliderRef.current;
    if (!slider) return;
    let interval = setInterval(() => {
      if (!slider) return;
      const card = slider.querySelector('img');
      if (!card) return;
      const cardWidth = card.offsetWidth + 32;
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.homePage} style={{ background: '#fff' }}>
      <div className={styles.mainWrapper}>
        {/* Hero Section */}
        <section id="hakkimizda" className={styles.heroSection} style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7rem 0 5.5rem 0' }}>
          <div className={styles.heroImageContainer}>
            <img src="/images/vetpet.png" alt="Çınar Pet Veteriner Kliniği" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className={styles.heroContent}>
            <div style={{ background: '#F7882F', color: '#fff', display: 'inline-block', borderRadius: 18, fontWeight: 800, fontSize: 20, padding: '0.3em 1.2em', marginBottom: 18 }}>HAKKIMIZDA</div>
            <h1 style={{ color: '#1a237e', fontWeight: 900, fontSize: 48, margin: '0 0 1.2rem 0', lineHeight: 1.1 }}>Çınar Pet Veteriner Kliniği</h1>
            <p style={{ color: '#6B7A8F', fontSize: 20, marginBottom: 32, textAlign: 'justify', lineHeight: 1.7 }}>
              Çınar Pet Veteriner Kliniği, evcil hayvanlarınızın sağlığına ve mutluluğuna değer katan, modern yaklaşımıyla öne çıkan bir veteriner sağlık merkezidir. 2022 yılında kurulan kliniğimiz, deneyimli veteriner hekimlerimiz ve teknolojik altyapımızla, minik dostlarınıza güvenilir, bireysel ve özenli hizmet sunmak üzere faaliyet göstermektedir. Her türden evcil hayvan için sunduğumuz geniş kapsamlı veterinerlik çözümleriyle, onların yaşam kalitesini en üst seviyeye taşımayı hedefliyoruz.
            </p>
            <Link to="/clinic/introduction" style={{ display: 'inline-block', background: '#fff', color: '#1a237e', fontWeight: 800, fontSize: 20, borderRadius: 32, boxShadow: '0 4px 24px rgba(44,62,80,0.10)', padding: '1rem 2.5rem', textDecoration: 'none', border: '2px solid #F7882F', transition: 'all 0.2s' }}>DEVAMINI OKU</Link>
          </div>
        </section>

        {/* Hizmetler Section */}
        <section id="hizmetler" style={{ margin: '8rem 0 7rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#F7882F', color: '#fff', display: 'inline-block', borderRadius: 18, fontWeight: 800, fontSize: 20, padding: '0.3em 1.2em', marginBottom: 18 }}>HİZMETLER</div>
          <h2 style={{ color: '#1a237e', fontWeight: 900, fontSize: 38, margin: '0 0 2.2rem 0', letterSpacing: 1, textAlign: 'center' }}>Hizmetler</h2>
          <div className={styles.serviceGrid}>
            {services.map(service => (
              <div key={service.id} className={styles.serviceCard}>
                <div style={{ fontSize: 48, marginBottom: 18 }}>{service.icon}</div>
                <div style={{ color: '#1a237e', fontWeight: 800, fontSize: 22, marginBottom: 10 }}>{service.title}</div>
                <div style={{ color: '#6B7A8F', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>{service.desc}</div>
                <Link to={`/services/${service.id}`} style={{ background: '#F7882F', color: '#fff', borderRadius: 24, fontWeight: 700, fontSize: 16, padding: '0.6em 1.5em', textDecoration: 'none', boxShadow: '0 2px 8px rgba(44,62,80,0.07)', transition: 'background 0.2s' }}>DETAY</Link>
              </div>
            ))}
          </div>
        </section>

        {/* Pet Shop Section - horizontally scrollable */}
        <section id="petshop" name="petshop" style={{ margin: '8rem 0 7rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#F7882F', color: '#fff', display: 'inline-block', borderRadius: 18, fontWeight: 800, fontSize: 20, padding: '0.3em 1.2em', marginBottom: 18 }}>PET SHOP</div>
          <h2 style={{ color: '#1a237e', fontWeight: 900, fontSize: 38, margin: '0 0 2.2rem 0', letterSpacing: 1, textAlign: 'center' }}>Ürünler</h2>
          <div className={styles.productSlider} ref={petShopSliderRef}>
            {petShopProducts.map(product => (
              <div key={product.id} style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px rgba(44,62,80,0.07)', padding: '2.2rem 2rem 1.5rem 2rem', minWidth: 320, maxWidth: 360, flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', scrollSnapAlign: 'start' }}>
                <img src={product.image} alt={product.title} style={{ width: 220, height: 160, objectFit: 'cover', borderRadius: 18, marginBottom: 18, boxShadow: '0 2px 8px rgba(44,62,80,0.07)' }} />
                <div style={{ color: '#1a237e', fontWeight: 800, fontSize: 22, marginBottom: 10 }}>{product.title}</div>
                <div style={{ color: '#6B7A8F', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>{product.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <button
              onClick={() => navigate('/store')}
              style={{
                background: '#F7882F',
                color: '#fff',
                fontWeight: 800,
                fontSize: 24,
                borderRadius: 32,
                boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                padding: '1.1rem 3rem',
                textDecoration: 'none',
                border: 'none',
                transition: 'background 0.2s',
                letterSpacing: '1px',
                marginTop: 10,
                fontFamily: 'Montserrat, Arial, sans-serif',
                cursor: 'pointer',
              }}
            >
              Pet Shop
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;