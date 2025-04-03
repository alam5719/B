const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Attribute = require('../models/Attribute');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .populate('attributes');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "Product saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving product" });
  }
});

// Add attribute to product
router.post('/:productId/attribute', async (req, res) => {
  try {
    const { name, value } = req.body;
    const productId = req.params.productId;

    // Create new attribute
    const newAttribute = new Attribute({
      name,
      value,
      product: productId
    });
    await newAttribute.save();

    // Update product with new attribute
    await Product.findByIdAndUpdate(
      productId,
      { $push: { attributes: newAttribute._id } }
    );

    res.json({ message: "Attribute added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding attribute" });
  }
});

// Get product attributes
router.get('/:productId/attributes', async (req, res) => {
  try {
    const attributes = await Attribute.find({ product: req.params.productId });
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attributes" });
  }
});

module.exports = router; 