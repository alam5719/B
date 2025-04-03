import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductAttributes from './ProductAttributes';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
      setFilteredProducts(response.data || []);
      setError(null);
    } catch (err) {
      setError('Error fetching products. Please try again later.');
      console.error('Error fetching products:', err);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAttributeChange = async (attributeType, value) => {
    try {
      const params = new URLSearchParams();
      if (attributeType === 'color') params.append('color', value);
      if (attributeType === 'storage') params.append('storage', value);
      if (attributeType === 'model') params.append('model', value);

      const response = await axios.get(`http://localhost:5000/api/products/filter?${params.toString()}`);
      setFilteredProducts(response.data || []);
    } catch (err) {
      console.error('Error filtering products:', err);
      setError('Error filtering products. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="filters-section">
        <h2>Filter Products</h2>
        <ProductAttributes onAttributeChange={handleAttributeChange} />
      </div>

      <div className="products-grid">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
    </div>
  );
};

export default ProductList; 