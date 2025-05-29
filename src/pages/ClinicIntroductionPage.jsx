import React from 'react';
import { FaClinicMedical, FaPaw, FaUserMd, FaHeartbeat, FaLightbulb, FaBullseye } from 'react-icons/fa';
import '../pages/Ortopedi.css';

const sections = [
  {
    icon: <FaClinicMedical className="service-icon" />, 
    title: "Hakkımızda",
    desc: "Çınar Pet Veteriner Kliniği, evcil hayvanlarınızın sağlığına ve mutluluğuna değer katan, modern yaklaşımıyla öne çıkan bir veteriner sağlık merkezidir. 2022 yılında kurulan kliniğimiz, deneyimli veteriner hekimlerimiz ve teknolojik altyapımızla, minik dostlarınıza güvenilir, bireysel ve özenli hizmet sunmak üzere faaliyet göstermektedir. Her türden evcil hayvan için sunduğumuz geniş kapsamlı veterinerlik çözümleriyle, onların yaşam kalitesini en üst seviyeye taşımayı hedefliyoruz."
  },
  {
    icon: <FaUserMd className="service-icon" />, 
    title: "Temel Prensiplerimiz",
    desc: "Kurulduğumuz günden bu yana temel prensibimiz, hayvan sağlığını bir bütün olarak ele almak ve her hastaya özel bakım sunmaktır. Sadece tedavi uygulamakla kalmayıp, aynı zamanda hayvan sahiplerini bilinçlendirmek ve onlara rehberlik etmek suretiyle, uzun vadeli refahın sağlanmasına katkı sunmayı görev biliyoruz."
  },
  {
    icon: <FaPaw className="service-icon" />, 
    title: "Hizmet Alanlarımız",
    desc: "Çınar Pet, koruyucu sağlık hizmetlerinden acil durum müdahalelerine, cerrahi operasyonlardan aşı uygulamalarına, diş sağlığından beslenme danışmanlığına kadar birçok alanda kaliteli ve güvenilir hizmet sunmaktadır. Hedefimiz, sadece tıbbi destek sağlamak değil; aynı zamanda evcil hayvanlarınızın huzurlu, sağlıklı ve mutlu bir yaşam sürmelerine katkı sağlamaktır."
  },
  {
    icon: <FaLightbulb className="service-icon" />, 
    title: "Vizyon",
    desc: "Yenilikçi ve kaliteli veterinerlik hizmetleriyle Samsun başta olmak üzere bölge genelinde fark yaratan, hayvan dostlarının yaşamını iyileştiren ve topluma örnek olan lider bir klinik olmak."
  },
  {
    icon: <FaBullseye className="service-icon" />, 
    title: "Misyon",
    desc: "Evcil hayvanların sağlığını, mutluluğunu ve güvenliğini her zaman ön planda tutan bir anlayışla, en yüksek standartlarda veteriner hizmeti sunmak. Uzman kadromuz, sürekli gelişen altyapımız ve şefkatli yaklaşımımızla, hem patili dostlarımıza hem de sahiplerine güven veren bir sağlık hizmeti sunmayı ilke ediniyoruz."
  }
];

function ClinicIntroductionPage() {
  return (
    <div className="service-detail-container">
      <div className="service-header">
        <h1>Çınar Pet Veteriner Kliniği</h1>
        <h2>Tanıtım</h2>
        <div className="service-header-bg"></div>
      </div>
      <div className="service-cards">
        {sections.map((section, idx) => (
          <div className="service-card" key={idx}>
            {section.icon}
            <h3>{section.title}</h3>
            <p>{section.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClinicIntroductionPage;