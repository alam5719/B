const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tagsRouter = require('./routes/tags');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is not set!");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Successfully connected to MongoDB");
  console.log("Database URL:", MONGODB_URI.replace(/(mongodb:\/\/)([^:]+):([^@]+)@/, '$1****:****@'));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  console.error("Full error:", err);
  process.exit(1);
});

// Routes
app.use('/api/tags', tagsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';  // Bind to all available network interfaces
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});



