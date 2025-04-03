const mongoose = require('mongoose');

const iphoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    default: 'Apple',
  },
  attributes: {
    processor: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    storage: [{
      type: String,
      required: true,
    }],
    ram: {
      type: String,
      required: true,
    },
    price: {
      base: {
        type: Number,
        required: true,
      },
    },
    colors: [{
      type: String,
      required: true,
    }],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Iphone', iphoneSchema); 