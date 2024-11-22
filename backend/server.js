// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // To use .env variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON

// Database connection (use your own MongoDB URI in .env)
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send("Hello from the backend!");
});

// Your other routes will go here (e.g., user routes, etc.)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
