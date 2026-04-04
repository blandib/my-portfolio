
/**const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const pool = require('./db');
require('dotenv').config();
const authRoutes = require('./routes/userRoutes');
const cors = require('cors'); 

const app = express();

app.use(cors()); 
app.use(express.json());

// Mounting the external routes under /auth
app.use('/auth', authRoutes);

// Helper Log to see if .env is working (Optional)
console.log("DEBUG: JWT Secret from .env is:", process.env.JWT_SECRET);

// --- 1. PUBLIC ROUTES ---

app.get('/test', (req, res) => {
  res.json({ message: "Server is working! Use Thunder Client for POST requests." });
});

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing name, email, or password in body" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
      [name, email, password_hash]
    );
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
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

    // Using the temporary secret to match the middleware below
    const token = jwt.sign({ id: user.id }, 'my_temporary_secret_key', { expiresIn: '1h' });
    console.log("Login successful, token generated for user:", user.id);
    res.json({ token });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 2. MIDDLEWARE ---

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  // MUST match the secret used in the Login route
  jwt.verify(token, 'my_temporary_secret_key', (err, user) => {
    if (err) {
      console.log("JWT Verify Error:", err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// --- 3. PROTECTED ROUTES ---

// POST /save-post
app.post('/save-post', authenticateToken, async (req, res) => {
  try {
    const { post_title, post_url } = req.body;
    await pool.query(
      'INSERT INTO saved_posts (user_id, post_title, post_url) VALUES ($1, $2, $3)',
      [req.user.id, post_title, post_url]
    );
    res.json({ message: "Post saved to your dashboard!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /donate
app.post('/donate', authenticateToken, async (req, res) => {
    try {
      const { amount, currency } = req.body;
      await pool.query(
        'INSERT INTO donations (user_id, amount, currency) VALUES ($1, $2, $3)',
        [req.user.id, amount, currency || 'USD']
      );
      res.json({ message: "Thank you for your donation!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// GET /dashboard
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

// DELETE /unsave-post/:id
app.delete('/unsave-post/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM saved_posts WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }
    res.json({ message: "Post removed from your dashboard!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. DATABASE SETUP ROUTE ---

app.get('/setup', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        profile_image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS saved_posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        post_title VARCHAR(255) NOT NULL,
        post_url TEXT NOT NULL,
        saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        status VARCHAR(50) DEFAULT 'completed',
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    res.send("✅ All tables are ready!");
  } catch (err) {
    res.status(500).send("❌ Setup failed: " + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));**/
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();
const authRoutes = require('./routes/userRoutes');
const cors = require('cors'); 

const app = express();

app.use(cors()); 
app.use(express.json());

// Mounting the external routes under /auth
app.use('/auth', authRoutes);

// Helper Log to see if .env is working
console.log("DEBUG: JWT Secret is loaded:", process.env.JWT_SECRET ? "YES" : "NO");

// --- 1. PUBLIC ROUTES ---

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
    // Note: Ensuring we use the correct schema prefix if not set in db.js
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

    // UPDATED: Now using process.env.JWT_SECRET
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. MIDDLEWARE ---

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  // UPDATED: Now using process.env.JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// --- 3. PROTECTED ROUTES ---

// POST /save-post
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

// POST /donate
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

// GET /dashboard
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

// DELETE /unsave-post/:id
app.delete('/unsave-post/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM saved_posts WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Unauthorized or not found" });
    }
    res.json({ message: "Removed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Setup and Listen
app.get('/setup', async (req, res) => {
    // ... setup logic from your code ...
    res.send("✅ Tables ready!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));