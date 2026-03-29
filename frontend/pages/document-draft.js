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
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />文书起草</h1>
          <p className="page-subtitle">智能起草诉讼文书、法律意见书等各类法律文件</p>
        </div>

        <div className="card">
          <div className="card-title">文书起草</div>
          <div className="form-group">
            <label className="form-label">文书类型</label>
            <select
              className="form-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              style={{ maxWidth: '240px' }}
            >
              <option value="">请选择文书类型</option>
              <option value="complaint">起诉状</option>
              <option value="defense">答辩状</option>
              <option value="appeal">上诉状</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">案件参数</label>
            <textarea
              className="form-textarea"
              placeholder="输入案件相关参数，包括当事人信息、事实经过、诉讼请求等..."
              value={params}
              onChange={(e) => setParams(e.target.value)}
            />
          </div>
          <button onClick={handleDraft} disabled={loading} className="btn btn-primary">
            {loading ? '生成中...' : '智能起草'}
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
