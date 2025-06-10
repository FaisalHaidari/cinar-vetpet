import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaUserMd } from 'react-icons/fa';

export default function AboutContactSection() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '3rem',
      marginBottom: '2rem',
      color: '#fff',
      textShadow: '0 2px 12px rgba(0,0,0,0.45)',
    }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.2rem', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>HİKAYEMİZ</div>
        <div style={{ color: '#F7882F', fontWeight: 900, fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '1.2rem', textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>Hakkımızda</div>
        <div style={{ maxWidth: 600, margin: '0 auto 2.5rem auto', fontSize: '1.15rem', lineHeight: 1.7, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
          Atakum Kavurmacısı, 1995 yılında kuruldu ve o zamandan beri mükemmel kavurma sunma konusunda kendini adamıştır.
          Geleneksel tariflerimizle hazırlanan kavurmamız, taze ve kaliteli malzemelerle yapılmaktadır.
          Müşterilerimize en iyi deneyimi sunmak için sürekli çalışıyoruz.
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.2rem', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>KAÇIRMAYIN</div>
        <div style={{ color: '#F7882F', fontWeight: 900, fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '1.2rem', textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>Bize Ulaşın</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.15rem', color: '#fff', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
            <FaMapMarkerAlt style={{ color: '#F7882F', fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />
            BARIŞ, Adalet, Karadeniz Cd. NO:59/13 SİTESİ B BLOK, 55060 İlkadım/Samsun
          </div>
          <a href="tel:05057058238" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '2.1rem', color: '#fff', fontWeight: 900, textDecoration: 'none', letterSpacing: '2px', borderBottom: '2px solid #F7882F', borderRadius: 8, padding: '0.2rem 1.2rem', background: 'rgba(0,0,0,0.25)', boxShadow: '0 2px 8px rgba(0,0,0,0.20)', textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
            <FaPhoneAlt style={{ color: '#F7882F', fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />
            0505 705 82 38
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.15rem', color: '#fff', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
            <FaUserMd style={{ color: '#F7882F', fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />
            Dilara Bayır Çınar & Ahmet Arda Çınar
          </div>
        </div>
      </div>
      <hr style={{ margin: '2.5rem 0 1rem 0', border: 'none', borderTop: '1px solid #bfc9d1', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
      <div style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
        © 2023 Çınar Pet Veteriner Kliniği. Tüm hakları saklıdır.
      </div>
    </div>
  );
} 