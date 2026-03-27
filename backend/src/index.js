require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// 数据库连接
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'lawdc',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

app.use(cors());
app.use(express.json());

// 路由
const authRouter = require('./routes/auth');
const casesRouter = require('./routes/cases');
const agentRouter = require('./routes/agent');
const chatRouter = require('./routes/chat');
const modelsRouter = require('./routes/models');
const analyticsRouter = require('./routes/analytics');
app.use('/api/auth', authRouter);
app.use('/api/cases', casesRouter);
app.use('/api', agentRouter);
app.use('/api', chatRouter);
app.use('/api', modelsRouter);
app.use('/api', analyticsRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

module.exports = { pool };
