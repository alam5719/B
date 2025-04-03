import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAttributes = ({ onAttributeChange }) => {
  const [attributes, setAttributes] = useState({
    colors: [],
    storage: [],
    models: []
  });
  const [selectedAttributes, setSelectedAttributes] = useState({
    color: '',
    storage: '',
    model: ''
  });

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      // Fetch unique attribute options
      const response = await axios.get('http://localhost:5000/api/products/attributes/options');
      const { colors, storage } = response.data;
      
      // Fetch all products to get unique models
      const productsResponse = await axios.get('http://localhost:5000/api/products');
      const models = [...new Set(productsResponse.data.map(product => product.attributes.model))].filter(Boolean);

      setAttributes({
        colors,
        storage,
        models
      });
    } catch (error) {
      console.error('Error fetching attributes:', error);
    }
  };

  const handleAttributeChange = (attributeType, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeType]: value
    }));
    
    // Notify parent component about attribute changes
    if (onAttributeChange) {
      onAttributeChange(attributeType, value);
    }
  };

  return (
    <div className="product-attributes">
      <div className="attribute-group">
        <label htmlFor="color">Color:</label>
        <select
          id="color"
          value={selectedAttributes.color}
          onChange={(e) => handleAttributeChange('color', e.target.value)}
        >
          <option value="">Select Color</option>
          {attributes.colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="attribute-group">
        <label htmlFor="storage">Storage:</label>
        <select
          id="storage"
          value={selectedAttributes.storage}
          onChange={(e) => handleAttributeChange('storage', e.target.value)}
        >
          <option value="">Select Storage</option>
          {attributes.storage.map((storage) => (
            <option key={storage} value={storage}>
              {storage}
            </option>
          ))}
        </select>
      </div>

      <div className="attribute-group">
        <label htmlFor="model">Model:</label>
        <select
          id="model"
          value={selectedAttributes.model}
          onChange={(e) => handleAttributeChange('model', e.target.value)}
        >
          <option value="">Select Model</option>
          {attributes.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductAttributes; 