const express = require('express');
const router = express.Router();
const Iphone = require('../models/Iphone');

// Get all iPhones
router.get('/', async (req, res) => {
  try {
    const iphones = await Iphone.find();
    res.json(iphones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new iPhone
router.post('/', async (req, res) => {
  const iphone = new Iphone(req.body);
  try {
    const newIphone = await iphone.save();
    res.status(201).json(newIphone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single iPhone
router.get('/:id', async (req, res) => {
  try {
    const iphone = await Iphone.findById(req.params.id);
    if (iphone) {
      res.json(iphone);
    } else {
      res.status(404).json({ message: 'iPhone not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an iPhone
router.put('/:id', async (req, res) => {
  try {
    const iphone = await Iphone.findById(req.params.id);
    if (iphone) {
      Object.assign(iphone, req.body);
      const updatedIphone = await iphone.save();
      res.json(updatedIphone);
    } else {
      res.status(404).json({ message: 'iPhone not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an iPhone
router.delete('/:id', async (req, res) => {
  try {
    const iphone = await Iphone.findById(req.params.id);
    if (iphone) {
      await iphone.remove();
      res.json({ message: 'iPhone deleted' });
    } else {
      res.status(404).json({ message: 'iPhone not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 