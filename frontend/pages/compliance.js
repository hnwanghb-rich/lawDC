import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Compliance() {
  const [businessInfo, setBusinessInfo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'compliance',
        type: 'check',
        data: { business_info: businessInfo }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('检查失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>🔍 合规检查Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <textarea
            placeholder="输入业务信息"
            value={businessInfo}
            onChange={(e) => setBusinessInfo(e.target.value)}
            style={{ padding: '10px', width: '100%', height: '150px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={handleCheck} disabled={loading} style={{ padding: '10px 20px', marginTop: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '检查中...' : '合规检查'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>检查报告</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
