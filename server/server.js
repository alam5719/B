const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const iphoneRoutes = require('./routes/iphoneRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/iphones', iphoneRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 