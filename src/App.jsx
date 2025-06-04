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
import Footer from './components/Footer';
import CerrahiHizmetler from './pages/CerrahiHizmetler';
import Ortopedi from './pages/Ortopedi';
import Dahiliye from './pages/Dahiliye';
import Mrg from './pages/Mrg';
import Endoskopi from './pages/Endoskopi';
import YogunBakim from './pages/YogunBakim';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import StoreCategoryOyuncaklar from './pages/StoreCategoryOyuncaklar';
import StoreCategorySaglik from './pages/StoreCategorySaglik';
import StoreCategoryMama from './pages/StoreCategoryMama';
import StoreCategoryKafesler from './pages/StoreCategoryKafesler';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/clinic/introduction" element={<ClinicIntroductionPage />} />
          <Route path="/clinic/mission" element={<ClinicMissionPage />} />
          <Route path="/payment/online" element={<OnlinePaymentPage />} />
          <Route path="/admin/*" element={<AdminPanelPage />} />
          <Route path="/store" element={<StoreHomePage />} />
          <Route path="/store/oyuncaklar" element={<StoreCategoryOyuncaklar />} />
          <Route path="/store/saglik" element={<StoreCategorySaglik />} />
          <Route path="/store/mama" element={<StoreCategoryMama />} />
          <Route path="/store/kafesler" element={<StoreCategoryKafesler />} />
          <Route path="/store/product/:id" element={<ProductDetailsPage />} />
          <Route path="/shipping-info" element={<ShippingInfoPage />} />
          <Route path="/services/1" element={<CerrahiHizmetler />} />
          <Route path="/services/2" element={<Ortopedi />} />
          <Route path="/services/3" element={<Dahiliye />} />
          <Route path="/services/7" element={<Mrg />} />
          <Route path="/services/8" element={<Endoskopi />} />
          <Route path="/services/9" element={<YogunBakim />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;