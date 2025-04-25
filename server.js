const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
