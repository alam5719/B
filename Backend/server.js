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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/apple_store";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit if cannot connect to database
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
app.listen(PORT, HOST, () => console.log(`🚀 Server running on http://${HOST}:${PORT}`));



