const express = require('express');
const router = express.Router();
const { pool } = require('../index');
const authMiddleware = require('../middleware/auth');

router.get('/analytics', authMiddleware, async (req, res) => {
  try {
    const caseCount = await pool.query('SELECT COUNT(*) FROM cases');
    const clientCount = await pool.query('SELECT COUNT(DISTINCT client_name) FROM cases');

    res.json({
      success: true,
      total_cases: parseInt(caseCount.rows[0].count),
      active_clients: parseInt(clientCount.rows[0].count),
      monthly_revenue: 1500000
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
