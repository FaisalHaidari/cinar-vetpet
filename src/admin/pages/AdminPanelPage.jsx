import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// کامپوننت‌های مربوط به پنل مدیریت (بعداً ایجاد خواهند شد)
const AdminDashboard = () => <div><h3>داشبورد مدیریت</h3><p>خوش آمدید به پنل مدیریت!</p></div>;
const ManageProducts = () => <div><h3>مدیریت محصولات</h3><p>در اینجا می‌توانید محصولات فروشگاه را مدیریت کنید.</p></div>;
const ManageServices = () => <div><h3>مدیریت خدمات</h3><p>در اینجا می‌توانید خدمات کلینیک را مدیریت کنید.</p></div>;

function AdminPanelPage() {
  return (
    <div>
      <h2>پنل مدیریت</h2>
      <ul>
        <li><Link to="/admin">داشبورد</Link></li>
        <li><Link to="/admin/products">مدیریت محصولات</Link></li>
        <li><Link to="/admin/services">مدیریت خدمات</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<ManageProducts />} />
        <Route path="/services" element={<ManageServices />} />
      </Routes>
    </div>
  );
}

export default AdminPanelPage;