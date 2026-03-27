import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Analytics() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'analytics',
      type: 'dashboard',
      data: {}
    });
    setDashboard(res.data);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>📊 数据洞察Agent</h1>
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
  );
}
