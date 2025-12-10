const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Database Connection (FIXED FOR MONGOOSE V8)
mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Connection Error: ', err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});