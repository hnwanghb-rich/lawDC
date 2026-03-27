const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../index');

const router = express.Router();

router.post('/chat', authMiddleware, async (req, res) => {
  const { messages, model } = req.body;

  try {
    // 获取模型配置
    const modelConfig = await pool.query('SELECT * FROM ai_models WHERE model_name = $1 AND is_active = true', [model]);

    if (modelConfig.rows.length === 0) {
      return res.status(400).json({ code: 400, message: '模型未配置' });
    }

    // 调用AI模型（这里需要集成实际的模型API）
    const aiResponse = '这是AI的回复'; // 实际应调用模型API

    // 保存对话历史
    const sessionId = `${req.userId}_${Date.now()}`;
    for (const msg of messages) {
      await pool.query(
        'INSERT INTO chat_messages (user_id, session_id, role, content, model_name) VALUES ($1, $2, $3, $4, $5)',
        [req.userId, sessionId, msg.role, msg.content, model]
      );
    }

    res.json({ code: 200, message: 'success', data: { content: aiResponse } });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
