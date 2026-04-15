const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.get('/download', async (req, res) => {
  try {
    // 1. Log the download in the database
    await pool.query('INSERT INTO resume_downloads (user_id) VALUES ($1)', [1]);

    // 2. Trigger the file download
    const resumePath = __dirname + '/../public/resume.pdf'; 
    res.download(resumePath, 'Blandine_Tech_Resume.pdf');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading resume");
  }
});

// Route to get the total count for your dashboard
router.get('/count', async (req, res) => {
  const result = await pool.query('SELECT COUNT(*) FROM resume_downloads');
  res.json({ total: result.rows[0].count });
});

module.exports = router;