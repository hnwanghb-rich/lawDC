import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
      const { token, user } = res.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || err.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">大成</div>
          <div className="login-title">大成律师事务所</div>
          <div className="login-subtitle">DACHENG LAW OFFICES · MANAGEMENT SYSTEM</div>
        </div>
        <div className="login-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">用户名 / 邮箱</label>
              <input
                type="text"
                className="form-input"
                placeholder="请输入用户名或邮箱"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">密码</label>
              <input
                type="password"
                className="form-input"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && (
              <div style={{ color: '#c0392b', fontSize: '13px', marginBottom: '10px', padding: '8px 12px', background: '#fdf0ef', borderRadius: '4px', border: '1px solid #f5c6c2' }}>
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
              {loading ? '登录中...' : '登录系统'}
            </button>
          </form>
          <p className="login-footer-text">
            还没有账号？<a href="/register">立即注册</a>
          </p>
        </div>
      </div>
    </div>
  );
}
