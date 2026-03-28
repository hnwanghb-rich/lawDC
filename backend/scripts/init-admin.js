const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/lawdc'
});

async function initAdmin() {
  try {
    const hash = await bcrypt.hash('12345678', 10);

    await pool.query(
      `INSERT INTO users (username, email, password_hash, name, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO NOTHING`,
      ['admin', 'admin@dacheng.com', hash, '系统管理员', 'admin']
    );

    console.log('管理员账号初始化成功: admin/12345678');
    process.exit(0);
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  }
}

initAdmin();
