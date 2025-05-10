import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClinicIntroductionPage from './pages/ClinicIntroductionPage';
import ClinicMissionPage from './pages/ClinicMissionPage';
import OnlinePaymentPage from './pages/OnlinePaymentPage';
import AdminPanelPage from './admin/pages/AdminPanelPage';
import StoreHomePage from './pages/StoreHomePage';
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/layout/PrivateRoute';
import NavigationBar from './components/layout/NavigationBar';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShippingInfoPage from './pages/ShippingInfoPage';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/auth' && <NavigationBar />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StoreHomePage />} />
          <Route path="/store/product/:id" element={<ProductDetailsPage />} />
          <Route path="/clinic/introduction" element={<ClinicIntroductionPage />} />
          <Route path="/clinic/mission" element={<ClinicMissionPage />} />
          <Route path="/payment/online" element={<OnlinePaymentPage />} />
          <Route path="/admin/*" element={<AdminPanelPage />} />
          <Route path="/shipping-info" element={<ShippingInfoPage />} /> {/* انتقال مسیر ShippingInfoPage به سطح PrivateRoute */}
        </Route>
      </Routes>
    </>
  );
}

export default App;