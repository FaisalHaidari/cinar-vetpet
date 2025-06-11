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
    imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
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
    imageUrl: '/images/image_1296.webp',
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
    imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
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
    imageUrl: '/images/image_1296.webp',
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
    imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
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
    imageUrl: '/images/image_1296.webp',
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
    imageUrl: '/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp',
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
    imageUrl: '/images/image_1296.webp',
    category: 'Kafesler ve Barınaklar',
    description: 'Dayanıklı ve konforlu köpek kulübesi',
    stock: 15,
    rating: 4.8,
    reviews: 60
  }
];

function StoreHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();

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

  // Define common button styles
  const commonButtonStyle = {
    flex: '1 1 auto', // Allow flex items to grow and shrink
    maxWidth: '48%', // Approximate width for two columns with gap
    background:'#f7882f',
    color:'#fff',
    fontWeight:800,
    fontSize:20,
    padding:'18px 28px', // Adjusted padding for size
    border:'1px solid #f7882f', // Added border
    borderRadius:8, // Adjusted border-radius
    boxShadow:'0 2px 8px rgba(0,0,0,0.1)', // Adjusted shadow
    cursor:'pointer',
    transition:'background-color 0.2s ease, box-shadow 0.2s ease' // Added hover transition
  };

  // Define hover style
  const buttonHoverStyle = {
    backgroundColor: '#e07b2e', // Darker apricot on hover
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)' // More prominent shadow on hover
  };

  return (
    <div className={styles.storeHomePage} style={{background:'#fff',minHeight:'100vh'}}>
      <div className={styles.mainWrapper}>
        <header className={styles.storeHeader} style={{justifyContent:'flex-start',flexDirection:'row-reverse',background:'#fff',boxShadow:'none',border:'none',padding:'32px 0 0 0'}}>
        </header>
        {/* Category Section */}
        <div style={{textAlign:'center',margin:'32px 0 40px 0'}}>
          <h2 style={{color:'#f7882f',fontWeight:800,fontSize:32,marginBottom:28}}>Menü Kategorileri</h2>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:20}}> {/* Container for rows */}
            {/* First row of buttons */}
            <div style={{display:'flex',justifyContent:'center',gap:24,flexWrap:'wrap',width:'100%',maxWidth:'600px'}}> {/* Row 1 container */}
              <button 
                  onClick={()=>navigate('/store/saglik')} 
                  style={commonButtonStyle}
                   onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, commonButtonStyle)}
              >Sağlık ve Veteriner Ürünleri</button>
              <button 
                  onClick={()=>navigate('/store/mama')} 
                  style={commonButtonStyle}
                   onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, commonButtonStyle)}
              >Mama ve Besin Ürünleri</button>
            </div>
            {/* Second row of buttons */}
            <div style={{display:'flex',justifyContent:'center',gap:24,flexWrap:'wrap',width:'100%',maxWidth:'600px'}}> {/* Row 2 container */}
               <button 
                  onClick={()=>navigate('/store/oyuncaklar')} 
                  style={commonButtonStyle}
                   onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, commonButtonStyle)}
              >Oyuncaklar</button>
              <button 
                  onClick={()=>navigate('/store/kafesler')} 
                  style={commonButtonStyle}
                   onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, commonButtonStyle)}
              >Kafesler ve Barınaklar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreHomePage;
