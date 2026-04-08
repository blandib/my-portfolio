
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const cors = require('cors'); 
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/userRoutes');
const app = express();

// --- 1. MIDDLEWARE & CONFIG ---
app.use(cors()); 
app.use(express.json());

// Mounting the external routes under /auth
app.use('/auth', authRoutes);

// --- 2. PUBLIC ROUTES ---

app.get('/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
      [name, email, password_hash]
    );
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
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. AUTHENTICATION MIDDLEWARE ---

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

// --- 4. PROTECTED ROUTES ---

app.post('/save-post', authenticateToken, async (req, res) => {
  try {
    const { post_title, post_url } = req.body;
    await pool.query(
      'INSERT INTO saved_posts (user_id, post_title, post_url) VALUES ($1, $2, $3)',
      [req.user.id, post_title, post_url]
    );
    res.json({ message: "Post saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/donate', authenticateToken, async (req, res) => {
  try {
    const { amount, currency } = req.body;
    await pool.query(
      'INSERT INTO donations (user_id, amount, currency) VALUES ($1, $2, $3)',
      [req.user.id, amount, currency || 'USD']
    );
    res.json({ message: "Thank you!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.delete('/unsave-post/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM saved_posts WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Unauthorized" });
    res.json({ message: "Removed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. SERVE FRONTEND (React) ---

/** * IMPORTANT: Because index.js is inside the /services folder, 
 * we use '../build' to go up one level to find the React files.
 */
app.use(express.static(path.join(__dirname, '../build')));

/**
 * Express 5 Wildcard Fix:
 * Using '(.*)' handles the catch-all for React Router navigation 
 * without triggering the PathError in Express 5.
 */
// This is a Regular Expression that matches any path
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// GET /projects - Fetch all portfolio projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /api/analytics/resume - Track resume downloads
app.post('/api/analytics/resume', async (req, res) => {
  try {
    await pool.query('INSERT INTO analytics (event_name) VALUES ($1)', ['resume_download']);
    res.json({ success: true, message: "Download tracked" });
  } catch (err) {
    console.error("Analytics Error:", err.message);
    res.status(500).json({ error: "Failed to track" });
  }
});

// GET /api/analytics/stats - Optional: See your total downloads
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM analytics WHERE event_name = $1', ['resume_download']);
    res.json({ total_downloads: result.rows[0].count });
  } catch (err) {
    res.status(500).send();
  }
});
// --- 6. START SERVER ---

/**
 * Render detects the port automatically. 
 * '0.0.0.0' ensures the server is reachable externally.
 */
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is live on port ${PORT}`);
});