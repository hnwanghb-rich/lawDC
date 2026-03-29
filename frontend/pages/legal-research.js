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
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />法律研究</h1>
          <p className="page-subtitle">智能检索法律法规、司法解释与典型案例</p>
        </div>

        <div className="card">
          <div className="card-title">法律问题检索</div>
          <div className="form-group">
            <label className="form-label">检索内容</label>
            <textarea
              className="form-textarea"
              placeholder="输入法律问题或案例关键词，支持自然语言描述..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button onClick={handleSearch} disabled={loading} className="btn btn-primary">
            {loading ? '检索中...' : '智能检索'}
          </button>
          {result && (
            <div className="result-box">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
