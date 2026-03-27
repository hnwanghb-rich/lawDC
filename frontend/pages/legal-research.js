import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function LegalResearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'legal_research',
        type: 'search',
        data: { query }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('搜索失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>📚 法律研究Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <textarea
            placeholder="输入法律问题或案例关键词"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '10px', width: '100%', height: '100px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{ padding: '10px 20px', marginTop: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? '搜索中...' : '智能检索'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>检索结果</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
