import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function CaseManager() {
  const [caseType, setCaseType] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'case_manager',
        type: 'create_case',
        data: { case_type: caseType }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data.result);
    } catch (error) {
      alert('分析失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>📋 案件管理Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="输入案件类型"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={handleAnalyze} disabled={loading} style={{ padding: '10px 20px', marginLeft: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '分析中...' : '智能分析'}
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
