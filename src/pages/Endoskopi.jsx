import React from "react";
import { FaMicroscope, FaLungs, FaStethoscope, FaSyringe, FaUserMd, FaHeartbeat } from "react-icons/fa";
import "./Ortopedi.css";

const sections = [
  {
    icon: <FaMicroscope className="service-icon" />, 
    title: "Endoskopi Nedir?",
    desc: "Endoskopi, birçok farklı hayvan türünde kullanılan bir tıbbi görüntüleme yöntemidir. Bu yöntem, bir esnek fiberoptik endoskop kullanılarak hayvanın iç organlarının görüntülenmesini ve teşhis edilmesini sağlar."
  },
  {
    icon: <FaStethoscope className="service-icon" />, 
    title: "Kullanım Alanları",
    desc: "Endoskopi hizmetleri genellikle sindirim sistemi problemleri, solunum sistemi problemleri, idrar yolu problemleri ve diğer iç organ sorunlarının teşhisinde kullanılır. Endoskopi ayrıca biyopsi alınması, tümörlerin incelenmesi, yabancı cisimlerin çıkarılması ve tedavi amaçlı müdahalelerde de kullanılabilir."
  },
  {
    icon: <FaSyringe className="service-icon" />, 
    title: "İşlem ve Avantajları",
    desc: "Endoskopi işlemi genellikle hayvanın anestezi altında yapılır ve minimal invaziv bir yöntemdir, yani cerrahi kesiler gerektirmez. Bu nedenle, hayvanın iyileşme süreci genellikle daha hızlı ve daha az ağrılı olabilir."
  },
  {
    icon: <FaUserMd className="service-icon" />, 
    title: "Uzmanlık ve Değerlendirme",
    desc: "Endoskopi hizmetleri, uzman veteriner hekimler tarafından gerçekleştirilir ve sonuçları doğru bir şekilde yorumlamak için deneyimli bir ekip tarafından incelenir. Bu sayede, hayvanınızın sağlık sorunları hızlı ve doğru bir şekilde teşhis edilip tedavi edilebilir."
  }
];

const Endoskopi = () => (
  <div className="service-detail-container">
    <div className="service-header">
      <h1>Çınar Pet Veteriner Kliniği</h1>
      <h2>Endoskopi</h2>
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

export default Endoskopi; 