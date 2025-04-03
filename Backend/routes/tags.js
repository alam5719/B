const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  const tag = new Tag({
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description
  });

  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single tag
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a tag
router.patch('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (tag) {
      if (req.body.name) tag.name = req.body.name;
      if (req.body.slug) tag.slug = req.body.slug;
      if (req.body.description) tag.description = req.body.description;
      
      const updatedTag = await tag.save();
      res.json(updatedTag);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (tag) {
      await tag.deleteOne();
      res.json({ message: 'Tag deleted' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 