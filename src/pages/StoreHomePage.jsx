import React, { useState, useEffect } from 'react';
import styles from '../styles/StoreHomePage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaSearch, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const products = [
  // Oyuncaklar
  {
    id: 1,
    name: 'Kedi Oyuncağı',
    price: 60,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    category: 'Oyuncaklar',
    description: 'Eğlenceli kedi oyuncağı',
    stock: 30,
    rating: 4.2,
    reviews: 85
  },
  {
    id: 2,
    name: 'Köpek Oyuncağı',
    price: 80,
    imageUrl: '/src/images/image_1296.webp',
    category: 'Oyuncaklar',
    description: 'Dayanıklı köpek oyuncağı',
    stock: 25,
    rating: 4.0,
    reviews: 45
  },
  // Sağlık ve Veteriner Ürünleri
  {
    id: 3,
    name: 'Veteriner Şampuanı',
    price: 150,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    category: 'Sağlık ve Veteriner Ürünleri',
    description: 'Hassas ciltler için özel şampuan',
    stock: 40,
    rating: 4.7,
    reviews: 92
  },
  {
    id: 4,
    name: 'Vitamin Takviyesi',
    price: 120,
    imageUrl: '/src/images/image_1296.webp',
    category: 'Sağlık ve Veteriner Ürünleri',
    description: 'Bağışıklık sistemini güçlendiren vitamin takviyesi',
    stock: 25,
    rating: 4.0,
    reviews: 45
  },
  // Mama ve Besin Ürünleri
  {
    id: 5,
    name: 'Kedi Maması',
    price: 120,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    category: 'Mama ve Besin Ürünleri',
    description: 'Lezzetli ve sağlıklı kedi maması',
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 6,
    name: 'Köpek Maması',
    price: 150,
    imageUrl: '/src/images/image_1296.webp',
    category: 'Mama ve Besin Ürünleri',
    description: 'Vitaminli köpek maması',
    stock: 40,
    rating: 4.7,
    reviews: 92
  },
  // Kafesler ve Barınaklar
  {
    id: 7,
    name: 'Kuş Kafesi',
    price: 250,
    imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
    category: 'Kafesler ve Barınaklar',
    description: 'Geniş ve konforlu kuş kafesi',
    stock: 20,
    rating: 4.6,
    reviews: 48
  },
  {
    id: 8,
    name: 'Köpek Kulübesi',
    price: 300,
    imageUrl: '/src/images/image_1296.webp',
    category: 'Kafesler ve Barınaklar',
    description: 'Dayanıklı ve konforlu köpek kulübesi',
    stock: 15,
    rating: 4.8,
    reviews: 60
  }
];

function StoreHomePage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();

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
    <div className={styles.storeHomePage} style={{background:'#fff',minHeight:'100vh'}}>
      <div className={styles.mainWrapper}>
        <header className={styles.storeHeader} style={{justifyContent:'flex-start',flexDirection:'row-reverse',background:'#fff',boxShadow:'none',border:'none',padding:'32px 0 0 0'}}>
          <button 
            className={styles.cartButton}
            onClick={() => setIsCartOpen(!isCartOpen)}
            style={{marginRight:24}}
          >
            <FaShoppingCart />
            <span className={styles.cartCount}>{cart.length}</span>
          </button>
        </header>
        {/* Category Section */}
        <div style={{textAlign:'center',margin:'32px 0 40px 0'}}>
          <h2 style={{color:'#f7882f',fontWeight:800,fontSize:32,marginBottom:28}}>Menü Kategorileri</h2>
          <div style={{display:'flex',justifyContent:'center',gap:24,flexWrap:'wrap'}}>
            <button onClick={()=>navigate('/store/oyuncaklar')} style={{background:'#f7882f',color:'#fff',fontWeight:800,fontSize:18,padding:'14px 28px',border:'none',borderRadius:10,boxShadow:'0 2px 8px #f6f7f9',cursor:'pointer',transition:'box-shadow 0.2s'}}>Oyuncaklar</button>
            <button onClick={()=>navigate('/store/saglik')} style={{background:'#f7882f',color:'#fff',fontWeight:800,fontSize:18,padding:'14px 28px',border:'none',borderRadius:10,boxShadow:'0 2px 8px #f6f7f9',cursor:'pointer',transition:'box-shadow 0.2s'}}>Sağlık ve Veteriner Ürünleri</button>
            <button onClick={()=>navigate('/store/mama')} style={{background:'#f7882f',color:'#fff',fontWeight:800,fontSize:18,padding:'14px 28px',border:'none',borderRadius:10,boxShadow:'0 2px 8px #f6f7f9',cursor:'pointer',transition:'box-shadow 0.2s'}}>Mama ve Besin Ürünleri</button>
            <button onClick={()=>navigate('/store/kafesler')} style={{background:'#f7882f',color:'#fff',fontWeight:800,fontSize:18,padding:'14px 28px',border:'none',borderRadius:10,boxShadow:'0 2px 8px #f6f7f9',cursor:'pointer',transition:'box-shadow 0.2s'}}>Kafesler ve Barınaklar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreHomePage;
