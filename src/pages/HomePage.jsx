import React from 'react';
import NavigationBar from '../components/layout/NavigationBar';

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <h1>صفحه اصلی فروشگاه حیوانات خانگی و کلینیک</h1>
      <p>به وبسایت ما خوش آمدید! ما بهترین محصولات و خدمات را برای حیوانات خانگی شما ارائه می‌دهیم.</p>
      {/* می‌توانید محتوای دیگر صفحه اصلی را در اینجا قرار دهید */}
    </div>
  );
}

export default HomePage;