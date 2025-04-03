

import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";

function Product() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount_price: "",
    stock_quantity: "",
    images: [],
    attributes: {
      color: "",
      storage: "",
      model: ""
    },
    brand: "",
    average_rating: "",
    total_reviews: "",
    is_active: true,
  });

  const [attributeOptions, setAttributeOptions] = useState({
    colors: [],
    storage: [],
    models: []
  });

  // Fetch attribute options from MongoDB
  useEffect(() => {
    const fetchAttributeOptions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/attributes");
        const data = await response.json();

        // Transform MongoDB attributes into dropdown options
        const options = {
          colors: data.find(attr => attr.name === "Color")?.values || [],
          storage: data.find(attr => attr.name === "Storage")?.values || [],
          models: data.find(attr => attr.name === "Model")?.values || []
        };

        setAttributeOptions(options);
      } catch (error) {
        console.error("Error fetching attribute options:", error);
      }
    };

    fetchAttributeOptions();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("attributes.")) {
      const attributeName = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attributeName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle File Selection and Preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImageURLs],
    }));
  };

  // Remove Image from Preview
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      price: Number(formData.price),
      discount_price: Number(formData.discount_price),
      stock_quantity: Number(formData.stock_quantity),
      ratings: {
        average: Number(formData.average_rating),
        total_reviews: Number(formData.total_reviews),
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("✅ Product added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        discount_price: "",
        stock_quantity: "",
        images: [],
        attributes: { color: "", storage: "", model: "" },
        brand: "",
        average_rating: "",
        total_reviews: "",
        is_active: true,
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Error adding product");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📱 Add New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Product Name */}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className={styles.input} required />

        {/* Description */}
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className={styles.input} required />

        {/* Category */}
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className={styles.input} required />

        {/* Price */}
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className={styles.input} required />

        {/* Discount Price */}
        <input type="number" name="discount_price" value={formData.discount_price} onChange={handleChange} placeholder="Discount Price" className={styles.input} required />

        {/* Stock Quantity */}
        <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="Stock Quantity" className={styles.input} required />

        {/* Image Upload */}
        <label>Upload Images:</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className={styles.fileInput} />

        {/* Image Previews */}
        <div className={styles.imagePreview}>
          {formData.images.map((img, index) => (
            <div key={index} className={styles.previewWrapper}>
              <img src={img} alt={`Preview ${index}`} className={styles.previewImage} />
              <button type="button" className={styles.removeButton} onClick={() => removeImage(index)}>❌</button>
            </div>
          ))}
        </div>

        {/* Attributes Section */}
        <div className={styles.attributesSection}>
          <h3>Product Attributes</h3>

          {/* Color Select */}
          <select name="attributes.color" value={formData.attributes.color} onChange={handleChange} className={styles.input} required>
            <option value="">Select Color</option>
            {attributeOptions.colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>

          {/* Storage Select */}
          <select name="attributes.storage" value={formData.attributes.storage} onChange={handleChange} className={styles.input} required>
            <option value="">Select Storage</option>
            {attributeOptions.storage.map((storage, index) => (
              <option key={index} value={storage}>{storage}</option>
            ))}
          </select>

          {/* Model Select */}
          <select name="attributes.model" value={formData.attributes.model} onChange={handleChange} className={styles.input} required>
            <option value="">Select Model</option>
            {attributeOptions.models.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className={styles.input} required />

        {/* Ratings */}
        <input type="number" name="average_rating" value={formData.average_rating} onChange={handleChange} placeholder="Average Rating" className={styles.input} required />
        <input type="number" name="total_reviews" value={formData.total_reviews} onChange={handleChange} placeholder="Total Reviews" className={styles.input} required />

        {/* Submit Button */}
        <button type="submit" className={styles.button}>Add Product</button>

      </form>
    </div>
  );
}

export default Product;
