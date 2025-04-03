import React, { useState } from "react";
import styles from "./TagForm.module.css";

const TagForm = ({ onTagAdded }) => {
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTag = { ...formData, createdAt: new Date() };

    try {
      const response = await fetch("http://localhost:5000/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTag),
      });

      if (!response.ok) throw new Error("Failed to add tag");

      alert("✅ Tag added successfully!");
      setFormData({ name: "", slug: "", description: "" });

      onTagAdded(); // Refresh tag list
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error adding tag!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Tag</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tag Name" required />
        <input className={styles.input} type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" required />
        <input className={styles.input} type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <button className={styles.button} type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default TagForm;
