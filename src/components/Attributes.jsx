import React, { useState, useEffect } from "react";
import styles from "./Attributes.module.css";

function Attributes() {
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({
    attributeId: "",
    productId: "",
    name: "",
    values: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch attributes from MongoDB
  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attributes");
      if (!res.ok) throw new Error("Failed to fetch attributes");
      const data = await res.json();
      setAttributes(data);
    } catch (err) {
      console.error("Error fetching attributes:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.attributeId || !formData.productId || !formData.name || !formData.values) {
      alert("All fields are required!");
      return;
    }

    const attributeData = {
      attributeId: formData.attributeId,
      productId: formData.productId,
      name: formData.name,
      values: formData.values.split(",").map((v) => v.trim()),
    };

    try {
      if (editingId) {
        // Update existing attribute
        const response = await fetch(`http://localhost:5000/api/attributes/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attributeData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update attribute");
        }

        const updatedAttribute = await response.json();
        
        // Update the local state with the updated attribute
        setAttributes(prevAttributes => 
          prevAttributes.map(attr => 
            attr._id === editingId ? updatedAttribute : attr
          )
        );

        // Reset form and editing state
        setFormData({
          attributeId: "",
          productId: "",
          name: "",
          values: "",
        });
        setEditingId(null);
        
        alert("✅ Attribute updated successfully!");
      } else {
        // Create new attribute
        const response = await fetch("http://localhost:5000/api/attributes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attributeData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add attribute");
        }

        const newAttribute = await response.json();
        setAttributes(prevAttributes => [...prevAttributes, newAttribute]);
        
        // Reset form
        setFormData({
          attributeId: "",
          productId: "",
          name: "",
          values: "",
        });
        
        alert("✅ Attribute added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`❌ Error ${editingId ? 'updating' : 'adding'} attribute: ${error.message}`);
    }
  };

  const handleEdit = (attribute) => {
    setFormData({
      attributeId: attribute.attributeId,
      productId: attribute.productId,
      name: attribute.name,
      values: Array.isArray(attribute.values) ? attribute.values.join(", ") : attribute.values
    });
    setEditingId(attribute._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attribute?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/attributes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete attribute");
      }

      setAttributes(prevAttributes => prevAttributes.filter(attr => attr._id !== id));
      alert("✅ Attribute deleted successfully!");
    } catch (error) {
      console.error("Error deleting attribute:", error);
      alert("❌ Error deleting attribute: " + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      attributeId: "",
      productId: "",
      name: "",
      values: "",
    });
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔧 Attribute Manager</h1>

      {/* Add/Edit Attribute Form */}
      <div className={styles.formContainer}>
        <h2>{editingId ? 'Edit Attribute' : 'Add New Attribute'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            name="attributeId" 
            value={formData.attributeId} 
            onChange={handleChange} 
            placeholder="Attribute ID" 
            className={styles.input} 
            required 
          />
          <input 
            type="text" 
            name="productId" 
            value={formData.productId} 
            onChange={handleChange} 
            placeholder="Product ID" 
            className={styles.input} 
            required 
          />
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Attribute Name" 
            className={styles.input} 
            required 
          />
          <input 
            type="text" 
            name="values" 
            value={formData.values} 
            onChange={handleChange} 
            placeholder="Values (comma-separated)" 
            className={styles.input} 
            required 
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              {editingId ? 'Update Attribute' : 'Add Attribute'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Display Attributes */}
      <div className={styles.grid}>
        {attributes.length > 0 ? (
          attributes.map((attribute) => (
            <div key={attribute._id} className={styles.card}>
              <div className={styles.cardContent}>
                <p><strong>Attribute ID:</strong> {attribute.attributeId}</p>
                <p><strong>Product ID:</strong> {attribute.productId}</p>
                <p><strong>Name:</strong> {attribute.name}</p>
                <p><strong>Values:</strong> {Array.isArray(attribute.values) ? attribute.values.join(", ") : attribute.values || "N/A"}</p>
              </div>
              <div className={styles.cardActions}>
                <button 
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => handleEdit(attribute)}
                >
                  Edit
                </button>
                <button 
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => handleDelete(attribute._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No attributes available</p>
        )}
      </div>
    </div>
  );
}

export default Attributes;
