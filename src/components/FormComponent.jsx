import React, { useState } from 'react';
import styles from './ProductManager.module.css';

function FormComponent() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      ...formData
    };
    setCategories([...categories, newCategory]);
    setFormData({ name: '', slug: '', description: '' });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEdit = (id) => {
    const category = categories.find(cat => cat.id === id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description
    });
    handleDelete(id);
  };

  return (
    <div className={styles.content}>
      <h2>Categories</h2>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            className={styles.input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Slug"
            className={styles.input}
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className={styles.input}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className={styles.button}>
            {formData.id ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>
      <div className={styles.list}>
        {categories.map((category) => (
          <div key={category.id} className={styles.item}>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categorySlug}>{category.slug}</span>
              <span className={styles.categoryDescription}>{category.description}</span>
            </div>
            <div className={styles.actions}>
              <button 
                className={styles.editBtn}
                onClick={() => handleEdit(category.id)}
              >
                Edit
              </button>
              <button 
                className={styles.deleteBtn}
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormComponent; 