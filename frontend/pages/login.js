import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      router.push('/');
    } catch (error) {
      alert(error.response?.data?.message || '登录失败');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', width: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>海南大成律所</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="用户名/邮箱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            登录
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          还没有账号？<a href="/register" style={{ color: '#10a37f' }}>注册</a>
        </p>
      </div>
    </div>
  );
}
