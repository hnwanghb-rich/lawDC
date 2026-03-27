import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function ContractReview() {
  const [contractText, setContractText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'contract_review',
        type: 'review',
        data: { contract_text: contractText }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('审查失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>📝 合同审查Agent</h1>
        <div style={{ marginTop: '20px' }}>
          <textarea
            placeholder="粘贴合同文本"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            style={{ padding: '10px', width: '100%', height: '200px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button
            onClick={handleReview}
            disabled={loading}
            style={{ padding: '10px 20px', marginTop: '10px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? '审查中...' : '智能审查'}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>审查报告</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
