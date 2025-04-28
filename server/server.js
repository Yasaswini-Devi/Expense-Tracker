const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS for frontend requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use('/api/expenses', expenseRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
