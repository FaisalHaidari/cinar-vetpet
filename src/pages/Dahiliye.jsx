import React from "react";
import { FaHeartbeat, FaVial, FaPrescriptionBottleAlt, FaAppleAlt, FaStethoscope, FaBrain, FaBone, FaHandHoldingMedical, FaMagnet } from "react-icons/fa";
import "./Ortopedi.css";

const sections = [
  {
    icon: <FaStethoscope className="service-icon" />, 
    title: "Dahiliye hizmetleri",
    desc: "Dahiliye hizmetleri, Çınar Pet Veteriner Kliniği'nde sunulan önemli bir hizmettir ve hayvanların iç organ sağlığını korumak ve tedavi etmek için önemli bir rol oynar. Bu hizmetler, hayvanların genel sağlığını destekleyerek daha uzun ve sağlıklı bir yaşam sürmelerine yardımcı olur."
  },
  {
    icon: <FaHeartbeat className="service-icon" />, 
    title: "İç hastalıkları teşhisi ve tedavisi",
    desc: "Çınar Pet Veteriner Kliniği'nde uzman veteriner hekimler, hayvanların iç organlarında ortaya çıkan hastalıkları teşhis eder ve tedavi eder. Bu hastalıklar arasında böbrek hastalıkları, karaciğer hastalıkları, endokrin bozukluklar ve sindirim sistemi hastalıkları bulunmaktadır."
  },
  {
    icon: <FaVial className="service-icon" />, 
    title: "Kan testleri ve diğer laboratuvar incelemeleri",
    desc: "Dahiliye hizmetleri kapsamında, kan testleri, idrar testleri, röntgen ve ultrason gibi laboratuvar incelemeleri yapılabilir. Bu testler, hayvanın iç organlarının sağlığı hakkında daha fazla bilgi sağlar ve doğru teşhis konulmasına yardımcı olur."
  },
  {
    icon: <FaPrescriptionBottleAlt className="service-icon" />, 
    title: "İlaç tedavisi",
    desc: "Dahiliye hizmetleri, hayvanların iç organlarında ortaya çıkan hastalıkların tedavisinde ilaçlar kullanabilir. Uzman veteriner hekimler, hayvanın durumuna ve hastalığın ciddiyetine göre uygun ilaçları reçete eder ve tedavi sürecini yönetir."
  },
  {
    icon: <FaAppleAlt className="service-icon" />, 
    title: "Beslenme danışmanlığı",
    desc: "Dahiliye hizmetleri kapsamında, hayvanın iç organ sağlığını desteklemek için uygun beslenme planları oluşturulabilir. Uzman veteriner hekimler, hayvanın beslenme ihtiyaçlarını belirler ve uygun besinleri önerir."
  },
  {
    icon: <FaHeartbeat className="service-icon" />, 
    title: "İç organ problemleri",
    desc: "Karaciğer, böbrek, dalak ve diğer iç organlardaki tümörler, enfeksiyonlar ve diğer hastalıkların teşhisinde kullanılır."
  }
];

const Dahiliye = () => (
  <div className="service-detail-container">
    <div className="service-header">
      <h1>Çınar Pet Veteriner Kliniği</h1>
      <h2>Dahiliye</h2>
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

export default Dahiliye; 