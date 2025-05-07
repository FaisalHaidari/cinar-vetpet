import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import StoreHomePage from './pages/StoreHomePage';
// ایمپورت کردن کامپوننت‌های صفحات
import HomePage from './pages/HomePage';
import ClinicIntroductionPage from './pages/ClinicIntroductionPage';
import ClinicMissionPage from './pages/ClinicMissionPage';
import OnlinePaymentPage from './pages/OnlinePaymentPage';
import AdminPanelPage from './admin/pages/AdminPanelPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* مسیر اصلی */}
        <Route path="/" element={<HomePage />} />

        {/* مسیرهای مربوط به معرفی کلینیک و ماموریت */}
        <Route path="/clinic/introduction" element={<ClinicIntroductionPage />} />
        <Route path="/clinic/mission" element={<ClinicMissionPage />} />

        {/* مسیر مربوط به سیستم پرداخت آنلاین */}
        <Route path="/payment/online" element={<OnlinePaymentPage />} />

        {/* مسیرهای مربوط به پنل مدیریت */}
        <Route path="/admin/*" element={<AdminPanelPage />} />
      </Routes>
      <Routes>
  {/* ... سایر مسیرها */}
  <Route path="/auth" element={<AuthPage />} />
</Routes>
<Routes>
  {/* ... سایر Route های قبلی شما */}
  <Route path="/store" element={<StoreHomePage />} /> {/* اضافه کردن این خط */}
</Routes>
    </BrowserRouter>
  );
}

export default App;