const express = require('express');
const router = express.Router();
const { pool } = require('../index');
const authMiddleware = require('../middleware/auth');

// 获取所有模型
router.get('/models', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ai_models ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 添加模型
router.post('/models', authMiddleware, async (req, res) => {
  const { name, provider, api_endpoint, api_key, model_name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ai_models (name, provider, api_endpoint, api_key, model_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, provider, api_endpoint, api_key, model_name]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 更新模型
router.put('/models/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, provider, api_endpoint, api_key, model_name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ai_models SET name=$1, provider=$2, api_endpoint=$3, api_key=$4, model_name=$5 WHERE id=$6 RETURNING *',
      [name, provider, api_endpoint, api_key, model_name, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 删除模型
router.delete('/models/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM ai_models WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
