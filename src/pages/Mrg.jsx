import React from "react";
import { FaBrain, FaBone, FaHeartbeat, FaHandHoldingMedical, FaMagnet } from "react-icons/fa";
import "./Ortopedi.css";

const sections = [
  {
    icon: <FaMagnet className="service-icon" />, 
    title: "MRG (Manyetik Rezonans Görüntüleme)",
    desc: "MRG Akademi hayvan hastanesinde sıklıkla kullanılan bir görüntüleme yöntemidir. Bu yöntem, hayvanın vücudundaki organları, dokuları ve kemikleri detaylı bir şekilde görüntülemek için manyetik alan ve radyo dalgaları kullanır."
  },
  {
    icon: <FaBrain className="service-icon" />, 
    title: "Beyin ve omurilik problemleri",
    desc: "Tümörler, enfeksiyonlar, travmalar ve diğer beyin ve omurilik hastalıklarının teşhisinde kullanılır."
  },
  {
    icon: <FaBone className="service-icon" />, 
    title: "Eklem problemleri",
    desc: "Eklem hastalıklarının teşhisi ve tedavisi için kullanılır."
  },
  {
    icon: <FaHeartbeat className="service-icon" />, 
    title: "İç organ problemleri",
    desc: "Karaciğer, böbrek, dalak ve diğer iç organlardaki tümörler, enfeksiyonlar ve diğer hastalıkların teşhisinde kullanılır."
  },
  {
    icon: <FaHandHoldingMedical className="service-icon" />, 
    title: "Yumuşak doku problemleri",
    desc: "Kas ve diğer yumuşak dokulardaki tümörler, yaralanmalar ve diğer problemlerin teşhisinde kullanılır."
  },
  {
    icon: <FaMagnet className="service-icon" />, 
    title: "Avantajlar",
    desc: "MRG, diğer görüntüleme yöntemlerine göre daha detaylı ve hassas bir görüntüleme sağlar. Bu nedenle, veteriner hekimler tarafından sıklıkla tercih edilir ve hayvanların doğru teşhis ve tedavi planları yapılmasına yardımcı olur."
  }
];

const Mrg = () => (
  <div className="service-detail-container">
    <div className="service-header">
      <h1>Çınar Pet Veteriner Kliniği</h1>
      <h2>MRG</h2>
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

export default Mrg; 