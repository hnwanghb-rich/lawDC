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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5', padding: '20px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', width: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>注册账号</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="用户名" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          <input type="email" placeholder="邮箱" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          <input type="password" placeholder="密码（至少8位）" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          <input type="text" placeholder="姓名" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <option value="lawyer">律师</option>
            <option value="partner">合伙人</option>
          </select>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>注册</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>已有账号？<a href="/login" style={{ color: '#10a37f' }}>登录</a></p>
      </div>
    </div>
  );
}
