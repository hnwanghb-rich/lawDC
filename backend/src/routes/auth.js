const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../index');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  const { username, email, password, name, role } = req.body;

  // 验证
  if (!username || !email || !password || !name) {
    return res.status(400).json({ code: 400, message: '缺少必填字段' });
  }

  if (password.length < 8) {
    return res.status(400).json({ code: 400, message: '密码至少8位' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, name, role',
      [username, email, hash, name, role || 'lawyer']
    );

    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ code: 200, message: 'success', data: { user: result.rows[0], token } });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ code: 401, message: '用户名或密码错误' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ code: 401, message: '用户名或密码错误' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ code: 200, message: 'success', data: { user: { id: user.id, username: user.username, name: user.name, role: user.role }, token } });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
