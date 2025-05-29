import React from "react";
import { FaStethoscope, FaBone, FaTools, FaWalking, FaHandHoldingMedical, FaUsers } from "react-icons/fa";
import "./Ortopedi.css";

const sections = [
  {
    icon: <FaStethoscope className="service-icon" />, 
    title: "Ortopedik muayene ve tanı",
    desc: "Uzman veteriner hekimler, hayvanınızın ortopedik durumunu değerlendirmek için detaylı bir muayene yapar ve gerekli görülürse röntgen, MRI veya diğer görüntüleme teknikleri kullanarak tanı koyar."
  },
  {
    icon: <FaBone className="service-icon" />, 
    title: "Kırık ve çıkıkların tedavisi",
    desc: "Eğer hayvanınızın kemiği kırılmış veya çıkmışsa, veteriner hekimler cerrahi müdahale yaparak kemiği düzeltir ve iyileşme sürecini destekler."
  },
  {
    icon: <FaTools className="service-icon" />, 
    title: "Eklem cerrahisi",
    desc: "Eklemlerdeki yaralanmalar, dejeneratif hastalıklar veya diğer ortopedik sorunlar için cerrahi müdahale gerekebilir. Bu tür cerrahi işlemler genellikle eklem içi cerrahi, eklem dışı cerrahi veya eklem protezi uygulamalarını içerebilir."
  },
  {
    icon: <FaWalking className="service-icon" />, 
    title: "Ortez ve protez uygulamaları",
    desc: "Bazı ortopedik durumlar için hayvanınıza özel olarak tasarlanmış ortez veya protezler kullanılabilir. Bu cihazlar, hayvanınızın hareket kabiliyetini ve yaşam kalitesini artırmak için tasarlanmıştır."
  },
  {
    icon: <FaHandHoldingMedical className="service-icon" />, 
    title: "Fizik tedavi ve rehabilitasyon",
    desc: "Ortopedik cerrahi sonrası veya ortopedik sorunların tedavisinde fizik tedavi ve rehabilitasyon önemli bir rol oynar. Bu hizmetler genellikle egzersiz programları, masaj, hidroterapi ve diğer fizik tedavi tekniklerini içerir."
  },
  {
    icon: <FaUsers className="service-icon" />, 
    title: "Genel Bilgi",
    desc: "Bu hizmetlerin yanı sıra, akademik hayvan hastanelerinde genellikle multidisipliner bir yaklaşım benimsenir ve uzman veteriner hekimler, cerrahlar, fizik tedavi uzmanları ve diğer sağlık profesyonelleri bir araya gelerek hayvanınızın en iyi şekilde tedavi edilmesini sağlar."
  }
];

const Ortopedi = () => (
  <div className="service-detail-container">
    <div className="service-header">
      <h1>Çınar Pet Veteriner Kliniği</h1>
      <h2>Ortopedi</h2>
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

export default Ortopedi; 