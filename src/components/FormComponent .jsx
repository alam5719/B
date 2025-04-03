

import React, { useState, useEffect } from "react";
import styles from "./FormComponent.module.css";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent_category: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories from MongoDB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Category added successfully!");
        setFormData({ name: "", description: "", parent_category: "" });
      } else {
        alert(data.error || "Submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed!");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
        />
        <input
          type="text"
          name="description"
          className={styles.input}
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select
          name="parent_category"
          className={styles.input}
          value={formData.parent_category}
          onChange={handleChange}
        >
          <option value="">Select Parent Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.button}>Add Category</button>
      </form>

      <h2>Existing Categories:</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name} - {category.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormComponent;

