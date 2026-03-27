import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Analytics() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'analytics',
        type: 'dashboard',
        data: {}
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDashboard(res.data);
    } catch (error) {
      alert('加载失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>📊 数据洞察Agent</h1>
        <button onClick={loadDashboard} disabled={loading} style={{ padding: '10px 20px', marginTop: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? '加载中...' : '刷新数据'}
        </button>
        {dashboard && (
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>营收</h3>
              <p style={{ fontSize: '24px' }}>¥1,500,000</p>
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>案件数</h3>
              <p style={{ fontSize: '24px' }}>45</p>
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>客户数</h3>
              <p style={{ fontSize: '24px' }}>30</p>
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>回款率</h3>
              <p style={{ fontSize: '24px' }}>85%</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
