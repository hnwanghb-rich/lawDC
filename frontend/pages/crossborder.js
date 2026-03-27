import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function CrossBorder() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'crossborder',
        type: 'ftz_policy',
        data: { query }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data.message);
    } catch (error) {
      alert('查询失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>🌏 跨境服务Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="查询自贸港政策"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '10px', width: '400px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={handleQuery} disabled={loading} style={{ padding: '10px 20px', marginLeft: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '查询中...' : '查询'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
