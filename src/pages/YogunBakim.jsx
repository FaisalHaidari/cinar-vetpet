import React from "react";
import { FaProcedures, FaLungs, FaTint, FaPills, FaHeartbeat, FaUtensils } from "react-icons/fa";
import "./Ortopedi.css";

const sections = [
  {
    icon: <FaProcedures className="service-icon" />, 
    title: "Yoğun Bakım Hizmetleri",
    desc: "Çınar Pet Veteriner Kliniği'nde yoğun bakım hizmetleri genellikle ciddi sağlık sorunları yaşayan hayvanlar için sunulan özel bir hizmettir. Yoğun bakım birimleri genellikle yüksek teknolojiye sahip ekipmanlarla donatılmıştır ve sürekli olarak hayvanların durumlarını izlemek ve gerektiğinde acil müdahalelerde bulunmak için uzman veteriner hekimler ve veteriner teknisyenler tarafından gözetlenir."
  },
  {
    icon: <FaLungs className="service-icon" />, 
    title: "Solunum desteği",
    desc: "Solunum yetmezliği yaşayan hayvanlara oksijen desteği ve solunum cihazları ile destek sağlanır."
  },
  {
    icon: <FaTint className="service-icon" />, 
    title: "Sıvı tedavisi",
    desc: "Dehidrasyon yaşayan hayvanlara intravenöz sıvı tedavisi uygulanır."
  },
  {
    icon: <FaPills className="service-icon" />, 
    title: "İlaç tedavisi",
    desc: "Yoğun bakımda bulunan hayvanlara gerekli ilaçlar ve tedaviler uygulanır."
  },
  {
    icon: <FaHeartbeat className="service-icon" />, 
    title: "Monitörizasyon",
    desc: "Hayvanların vital işaretleri (nabız, solunum hızı, kan basıncı vb.) sürekli olarak izlenir ve gerektiğinde müdahale edilir."
  },
  {
    icon: <FaUtensils className="service-icon" />, 
    title: "Beslenme desteği",
    desc: "Yoğun bakımda bulunan hayvanlara beslenme desteği sağlanır ve gerektiğinde enteral veya parenteral beslenme uygulanır."
  }
];

const YogunBakim = () => (
  <div className="service-detail-container">
    <div className="service-header">
      <h1>Çınar Pet Veteriner Kliniği</h1>
      <h2>Yoğun Bakım</h2>
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

export default YogunBakim; 