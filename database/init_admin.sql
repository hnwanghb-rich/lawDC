-- 初始化管理员账号
-- 密码: 12345678 (bcrypt hash)
INSERT INTO users (username, email, password_hash, name, role)
VALUES (
  'admin',
  'admin@dacheng.com',
  '$2b$10$rKZvVqVQxGxH8YqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq',
  '系统管理员',
  'admin'
)
ON CONFLICT (username) DO NOTHING;
