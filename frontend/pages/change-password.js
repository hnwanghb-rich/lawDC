import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('两次密码不一致');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:3000/api/auth/change-password',
        { userId: user.id, oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('密码修改成功');
      router.push('/');
    } catch (error) {
      alert(error.response?.data?.message || '修改失败');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
        <h1>修改密码</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label>原密码</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>新密码</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>确认新密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          <button type="submit" style={{ padding: '12px 30px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            确认修改
          </button>
        </form>
      </div>
    </Layout>
  );
}
