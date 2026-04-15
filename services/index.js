
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const cors = require('cors'); 
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/userRoutes');
const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());
app.use('/auth', authRoutes);

// --- 2. AUTHENTICATION HELPER ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// --- 3. PUBLIC API ROUTES ---

// Test Route
app.get('/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

// Fetch Portfolio Projects (This is what your ProjectList.jsx needs!)
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} );

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
    const password_hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)', [name, email, password_hash]);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. PROTECTED API ROUTES ---

app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const profile = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);
    const savedPosts = await pool.query('SELECT * FROM saved_posts WHERE user_id = $1 ORDER BY saved_at DESC', [req.user.id]);
    const donations = await pool.query('SELECT * FROM donations WHERE user_id = $1 ORDER BY transaction_date DESC', [req.user.id]);
    res.json({
      user: profile.rows[0],
      savedPosts: savedPosts.rows,
      donations: donations.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/save-post', authenticateToken, async (req, res) => {
  try {
    const { post_title, post_url } = req.body;
    await pool.query('INSERT INTO saved_posts (user_id, post_title, post_url) VALUES ($1, $2, $3)', [req.user.id, post_title, post_url]);
    res.json({ message: "Post saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/unsave-post/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM saved_posts WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Unauthorized" });
    res.json({ message: "Removed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. SERVE FRONTEND (Must stay at the bottom) ---

app.use(express.static(path.join(__dirname, '../build')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// --- 6. START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is live on port ${PORT}`);
});