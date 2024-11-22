// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // To use .env variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON

// Basic route
app.get('/', (req, res) => {
  res.send("Hello from the backend!");
});

// Your other routes will go here (e.g., user routes, etc.)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
