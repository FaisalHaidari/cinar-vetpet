import React from 'react';
import styles from '../styles/ClinicIntroductionPage.module.css';
import { FaPhone, FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';

function ClinicIntroductionPage() {
  return (
    <div className={styles.clinicIntroductionPage}>
      <div className={styles.heroImage}>
        <img src="/src/images/tablo.png" alt="Çınar Pet Veteriner Kliniği" />
      </div>
      <div className={styles.contentContainer}>
        <h1>Çınar Pet Veteriner Kliniği</h1>
        
        <div className={styles.introductionText}>
          <p>
            Çınar Pet Veteriner Kliniği, evcil hayvanlarınızın sağlığına ve mutluluğuna değer katan, modern yaklaşımıyla öne çıkan bir veteriner sağlık merkezidir. 2022 yılında kurulan kliniğimiz, deneyimli veteriner hekimlerimiz ve teknolojik altyapımızla, minik dostlarınıza güvenilir, bireysel ve özenli hizmet sunmak üzere faaliyet göstermektedir. Her türden evcil hayvan için sunduğumuz geniş kapsamlı veterinerlik çözümleriyle, onların yaşam kalitesini en üst seviyeye taşımayı hedefliyoruz.
          </p>

          <p>
            Kurulduğumuz günden bu yana temel prensibimiz, hayvan sağlığını bir bütün olarak ele almak ve her hastaya özel bakım sunmaktır. Sadece tedavi uygulamakla kalmayıp, aynı zamanda hayvan sahiplerini bilinçlendirmek ve onlara rehberlik etmek suretiyle, uzun vadeli refahın sağlanmasına katkı sunmayı görev biliyoruz.
          </p>

          <p>
            Çınar Pet, koruyucu sağlık hizmetlerinden acil durum müdahalelerine, cerrahi operasyonlardan aşı uygulamalarına, diş sağlığından beslenme danışmanlığına kadar birçok alanda kaliteli ve güvenilir hizmet sunmaktadır. Hedefimiz, sadece tıbbi destek sağlamak değil; aynı zamanda evcil hayvanlarınızın huzurlu, sağlıklı ve mutlu bir yaşam sürmelerine katkı sağlamaktır.
          </p>
        </div>

        <div className={styles.visionMission}>
          <div className={styles.vision}>
            <h2>Vizyon</h2>
            <p>
              Yenilikçi ve kaliteli veterinerlik hizmetleriyle Samsun başta olmak üzere bölge genelinde fark yaratan, hayvan dostlarının yaşamını iyileştiren ve topluma örnek olan lider bir klinik olmak.
            </p>
          </div>

          <div className={styles.mission}>
            <h2>Misyon</h2>
            <p>
              Evcil hayvanların sağlığını, mutluluğunu ve güvenliğini her zaman ön planda tutan bir anlayışla, en yüksek standartlarda veteriner hizmeti sunmak. Uzman kadromuz, sürekli gelişen altyapımız ve şefkatli yaklaşımımızla, hem patili dostlarımıza hem de sahiplerine güven veren bir sağlık hizmeti sunmayı ilke ediniyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicIntroductionPage;