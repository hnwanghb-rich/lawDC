import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function IPManagement() {
  const [ipInfo, setIpInfo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'ip_management',
        type: 'analyze',
        data: { ip_info: ipInfo }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('分析失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>💡 知识产权Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <textarea
            placeholder="输入知识产权信息"
            value={ipInfo}
            onChange={(e) => setIpInfo(e.target.value)}
            style={{ padding: '10px', width: '100%', height: '150px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={handleAnalyze} disabled={loading} style={{ padding: '10px 20px', marginTop: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '分析中...' : '智能分析'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>分析报告</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
