const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Peddal-connect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a schema for your data
const userDataSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a model based on the schema
const UserData = mongoose.model('UserData', userDataSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Route to handle POST requests to /signup
app.post('/signup', async (req, res) => {
  try {
    // Create a new document based on the request body
    const newUser = new UserData({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Save the new document to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
