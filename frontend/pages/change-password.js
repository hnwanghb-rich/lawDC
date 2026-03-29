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
      <div className="page-container" style={{ maxWidth: '560px' }}>
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />修改密码</h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">原密码</label>
              <input type="password" className="form-input" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">新密码</label>
              <input type="password" className="form-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">确认新密码</label>
              <input type="password" className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">确认修改</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
