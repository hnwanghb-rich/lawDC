import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function DocumentDraft() {
  const [docType, setDocType] = useState('');
  const [params, setParams] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDraft = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'document_draft',
        type: 'draft',
        data: { doc_type: docType, params }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('生成失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>✍️ 文书起草Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option value="">选择文书类型</option>
            <option value="complaint">起诉状</option>
            <option value="defense">答辩状</option>
            <option value="appeal">上诉状</option>
          </select>
          <textarea
            placeholder="输入案件参数"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            style={{ padding: '10px', width: '100%', height: '120px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={handleDraft} disabled={loading} style={{ padding: '10px 20px', marginTop: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '生成中...' : '智能起草'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>生成文书</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
