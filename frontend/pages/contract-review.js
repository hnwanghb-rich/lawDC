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
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />合同审查</h1>
          <p className="page-subtitle">智能识别合同风险条款，提供专业审查意见</p>
        </div>

        <div className="card">
          <div className="card-title">合同文本审查</div>
          <div className="form-group">
            <label className="form-label">合同文本</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '200px' }}
              placeholder="粘贴合同文本内容..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
            />
          </div>
          <button onClick={handleReview} disabled={loading} className="btn btn-primary">
            {loading ? '审查中...' : '智能审查'}
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
