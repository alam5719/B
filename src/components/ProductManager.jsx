import React, { useState } from 'react';
import styles from './ProductManager.module.css';
import Product from './Products';
import FormComponent  from './FormComponent ';
import Attributes from './Attributes';
import TagForm from './TagForm';

function ProductManager() {
  const [activeTab, setActiveTab] = useState('products');
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [products, setProducts] = useState([]);
  const [tagform, setTagForm] = useState([]);



  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <FormComponent />;

      case 'attributes':
        return <Attributes/>
case 'tagform':
  return <TagForm></TagForm>

      
      case 'products':
        return <Product />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h1>Admin</h1>
        </div>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'categories' ? styles.active : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'attributes' ? styles.active : ''}`}
            onClick={() => setActiveTab('attributes')}
          >
            Attributes
          </button>


          <button 
            className={`${styles.navItem} ${activeTab === 'tagform' ? styles.active : ''}`}
            onClick={() => setActiveTab('tagform')}
          >
            Tags
          </button>


        </nav>
      </div>
      <div className={styles.main}>
        {renderContent()}
      </div>
    </div>
  );
}

export default ProductManager; 