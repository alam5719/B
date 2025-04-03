const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String,
    required: true,
    trim: true 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  discount_price: { 
    type: Number,
    min: 0 
  },
  stock_quantity: { 
    type: Number, 
    required: true,
    min: 0 
  },
  images: [{
    type: String,
    required: true
  }],
  attributes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute'
  }],
  brand: { 
    type: String,
    required: true,
    trim: true 
  },
  ratings: {
    average: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5 
    },
    total_reviews: { 
      type: Number, 
      default: 0,
      min: 0 
    }
  },
  is_active: { 
    type: Boolean, 
    default: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema); 