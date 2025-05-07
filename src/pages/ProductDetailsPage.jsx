import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h2>جزئیات محصول با ID: {id}</h2>
      <p>اطلاعات مربوط به محصول با ID {id} در اینجا نمایش داده خواهد شد.</p>
    </div>
  );
}

export default ProductDetailsPage;