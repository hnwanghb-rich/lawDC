const express = require('express');
const router = express.Router();
const { pool } = require('../index');

// 获取案件列表
router.get('/cases', async (req, res) => {
  const { lawyer_id } = req.query;
  const result = await pool.query(
    'SELECT * FROM cases WHERE lawyer_id = $1',
    [lawyer_id]
  );
  res.json(result.rows);
});

// 创建案件
router.post('/cases', async (req, res) => {
  const { case_number, case_type, title, client_id, lawyer_id } = req.body;
  const result = await pool.query(
    'INSERT INTO cases (case_number, case_type, title, client_id, lawyer_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [case_number, case_type, title, client_id, lawyer_id, 'open']
  );
  res.json(result.rows[0]);
});

module.exports = router;
