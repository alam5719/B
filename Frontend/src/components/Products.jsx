import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductList.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data || []);
      setError(null);
    } catch (err) {
      setError('Error fetching products. Please try again later.');
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-grid">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id || product.id} className="product-card">
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/200'} 
              alt={product.name} 
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Color: {product.attributes?.color || 'N/A'}</p>
              <p>Storage: {product.attributes?.storage || 'N/A'}</p>
              <p>Model: {product.attributes?.model || 'N/A'}</p>
              <p className="price">${product.price}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="no-products">No products found</div>
      )}
    </div>
  );
};

export default Products; 