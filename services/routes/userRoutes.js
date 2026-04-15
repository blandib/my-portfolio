
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); 

// ADD THIS LINE HERE:
const authenticateToken = require('../middleware/auth'); 
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert into users table
    await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// POST /donate (Protected)
router.post('/donate', authenticateToken, async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const userId = req.user.id; // From JWT

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Please provide a valid amount." });
    }

    // Insert into the app_data.donations table
    const result = await pool.query(
      'INSERT INTO app_data.donations (user_id, amount, currency, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, amount, currency || 'USD', 'completed']
    );

    res.json({ 
      message: "Thank you for your donation!", 
      donation: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /unsave-post/:id
router.delete('/unsave-post/:id', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Use AND user_id to ensure users can't delete other people's posts!
    const result = await pool.query(
      'DELETE FROM app_data.saved_posts WHERE id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    res.json({ message: "Post removed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// ... rest of your code (register, donate, etc.) ...