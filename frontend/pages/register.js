import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '', role: 'lawyer' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', form);
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      router.push('/');
    } catch (error) {
      alert(error.response?.data?.message || '注册失败');
    }
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">大成</div>
          <div className="login-title">注册账号</div>
          <div className="login-subtitle">DACHENG LAW OFFICES · NEW ACCOUNT</div>
        </div>
        <div className="login-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">用户名</label>
              <input type="text" className="form-input" placeholder="请设置用户名" value={form.username} onChange={update('username')} required />
            </div>
            <div className="form-group">
              <label className="form-label">邮箱</label>
              <input type="email" className="form-input" placeholder="请输入邮箱地址" value={form.email} onChange={update('email')} required />
            </div>
            <div className="form-group">
              <label className="form-label">密码</label>
              <input type="password" className="form-input" placeholder="至少 8 位字符" value={form.password} onChange={update('password')} required />
            </div>
            <div className="form-group">
              <label className="form-label">姓名</label>
              <input type="text" className="form-input" placeholder="请输入真实姓名" value={form.name} onChange={update('name')} required />
            </div>
            <div className="form-group">
              <label className="form-label">职位</label>
              <select className="form-select" value={form.role} onChange={update('role')}>
                <option value="lawyer">律师</option>
                <option value="partner">合伙人</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              注册
            </button>
          </form>
          <p className="login-footer-text">
            已有账号？<a href="/login">立即登录</a>
          </p>
        </div>
      </div>
    </div>
  );
}
