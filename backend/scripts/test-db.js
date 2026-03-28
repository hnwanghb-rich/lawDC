require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'lawdc',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

async function testConnection() {
  try {
    console.log('测试数据库连接...');
    console.log(`连接参数: ${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    const client = await pool.connect();
    console.log('✓ 数据库连接成功');

    const res = await client.query('SELECT NOW()');
    console.log('✓ 查询测试成功:', res.rows[0]);

    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    console.log('✓ 数据库表:', tables.rows.map(r => r.table_name).join(', '));

    const users = await client.query('SELECT COUNT(*) FROM users');
    console.log('✓ users 表记录数:', users.rows[0].count);

    client.release();
    process.exit(0);
  } catch (error) {
    console.error('✗ 数据库连接失败:', error.message);
    process.exit(1);
  }
}

testConnection();
