import React from 'react';

export default function AboutPage() {
  return (
    <div style={{
      background: '#fff',
      minHeight: '100vh',
      padding: '5rem 0 3rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3.5rem',
        maxWidth: 1200,
        width: '100%',
        marginBottom: '4rem'
      }}>
        <img
          src="/images/vetpet.png"
          alt="Çınar Pet Veteriner Kliniği"
          style={{
            width: 420,
            height: 350,
            objectFit: 'cover',
            borderRadius: 32,
            boxShadow: '0 8px 32px rgba(44,62,80,0.13)'
          }}
        />
        <div>
          <h1 style={{
            color: '#1a237e',
            fontWeight: 900,
            fontSize: 44,
            marginBottom: 18,
            lineHeight: 1.1
          }}>
            Çınar Pet Veteriner Kliniği
          </h1>
          <p style={{
            color: '#6B7A8F',
            fontSize: 22,
            lineHeight: 1.7,
            marginBottom: 0
          }}>
            Çınar Pet Veteriner Kliniği, evcil hayvanlarınızın sağlığına ve mutluluğuna değer katan, modern yaklaşımıyla öne çıkan bir veteriner sağlık merkezidir. 2022 yılında kurulan kliniğimiz, deneyimli veteriner hekimlerimiz ve teknolojik altyapımızla, minik dostlarınıza güvenilir, bireysel ve özenli hizmet sunmak üzere faaliyet göstermektedir. Her türden evcil hayvan için sunduğumuz geniş kapsamlı veterinerlik çözümleriyle, onların yaşam kalitesini en üst seviyeye taşımayı hedefliyoruz.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, width: '100%', color: '#444', fontSize: 20, lineHeight: 1.8 }}>
        <p style={{ marginBottom: 32 }}>
          <b>Kurulduğumuz günden bu yana temel prensibimiz:</b> hayvan sağlığını bir bütün olarak ele almak ve her hastaya özel bakım sunmaktır. Sadece tedavi uygulamakla kalmayıp, aynı zamanda hayvan sahiplerini bilinçlendirmek ve onlara rehberlik etmek suretiyle, uzun vadeli refahın sağlanmasına katkı sunmayı görev biliyoruz.
        </p>
        <p style={{ marginBottom: 32 }}>
          <b>Çınar Pet</b>, koruyucu sağlık hizmetlerinden acil durum müdahalelerine, cerrahi operasyonlardan aşı uygulamalarına, diş sağlığından beslenme danışmanlığına kadar birçok alanda kaliteli ve güvenilir hizmet sunmaktadır. Hedefimiz, sadece tıbbi destek sağlamak değil; aynı zamanda evcil hayvanlarınızın huzurlu, sağlıklı ve mutlu bir yaşam sürmelerine katkı sağlamaktır.
        </p>
        <div style={{
          background: '#F7C331',
          borderRadius: 18,
          padding: '2.2rem 2rem',
          marginBottom: 32,
          boxShadow: '0 4px 24px rgba(44,62,80,0.07)'
        }}>
          <h2 style={{ color: '#1a237e', fontWeight: 900, fontSize: 28, marginBottom: 12 }}>Vizyon</h2>
          <p style={{ color: '#444', fontSize: 20, margin: 0 }}>
            Yenilikçi ve kaliteli veterinerlik hizmetleriyle Samsun başta olmak üzere bölge genelinde fark yaratan, hayvan dostlarının yaşamını iyileştiren ve topluma örnek olan lider bir klinik olmak.
          </p>
        </div>
        <div style={{
          background: '#F7882F',
          borderRadius: 18,
          padding: '2.2rem 2rem',
          color: '#fff',
          boxShadow: '0 4px 24px rgba(44,62,80,0.07)'
        }}>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 28, marginBottom: 12 }}>Misyon</h2>
          <p style={{ fontSize: 20, margin: 0 }}>
            Evcil hayvanların sağlığını، mutluluğunu ve güvenliğini هر zaman ön planda tutan bir anlayışla، en yüksek standartlarda veteriner hizmetی sunmak. Uzman kadromuz، sürekli gelişen altyapımız ve şefkatli yaklaşımımızla، hem patili dostlarımıza hem de sahiplerine güven veren bir sağlık hizmeti sunmayı ilke ediniyoruz.
          </p>
        </div>
      </div>
    </div>
  );
} 