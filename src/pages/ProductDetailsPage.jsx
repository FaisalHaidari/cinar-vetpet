import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      {/* Product details will be displayed here */}
    </div>
  );
}

export default ProductDetailsPage;