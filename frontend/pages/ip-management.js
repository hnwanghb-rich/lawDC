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
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />知识产权</h1>
          <p className="page-subtitle">专利、商标、著作权等知识产权智能分析</p>
        </div>

        <div className="card">
          <div className="card-title">知识产权分析</div>
          <div className="form-group">
            <label className="form-label">知识产权信息</label>
            <textarea
              className="form-textarea"
              placeholder="输入知识产权相关信息，包括类型、权利人、侵权情况等..."
              value={ipInfo}
              onChange={(e) => setIpInfo(e.target.value)}
            />
          </div>
          <button onClick={handleAnalyze} disabled={loading} className="btn btn-primary">
            {loading ? '分析中...' : '智能分析'}
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
