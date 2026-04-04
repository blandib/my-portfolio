const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  // 1. Updated SSL for better stability on Render
  ssl: {
    rejectUnauthorized: false,
  },
  // 2. Add connection timeouts to prevent "unexpected termination"
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  // 3. Ensure we are in the right schema
  options: "-c search_path=app_data,public" 
});

// Add this to debug connection issues
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


module.exports = pool;