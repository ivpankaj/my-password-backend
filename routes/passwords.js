const express = require('express');
const bcrypt = require('bcryptjs');
const Password = require('../models/Password');
const router = express.Router();

// Add a new password
// Add a new password
router.post('/add', async (req, res) => {
    const { variable, password } = req.body;
    try {
      const newPassword = new Password({ variable, password });
      await newPassword.save();
      res.json({ message: 'Password added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Get all passwords
router.get('/', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a password
router.put('/update/:id', async (req, res) => {
  const { password } = req.body; // Password to be updated
  try {
    // Step 1: Ensure password exists in the request body
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Step 3: Update the password in the database
    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id, // Password ID to update
      { password: password }, // Make sure this matches the field name in your schema
      { new: true } // Return the updated document
    );

    // Step 4: Handle case where password is not found
    if (!updatedPassword) {
      return res.status(404).json({ error: 'Password not found' });
    }

    // Step 5: Return the updated password
    res.json(updatedPassword);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a password
router.delete('/delete/:id', async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: 'Password deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
