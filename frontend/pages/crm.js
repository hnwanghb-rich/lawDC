import { useState } from 'react';
import axios from 'axios';

export default function CRM() {
  const [clientInfo, setClientInfo] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'crm',
      type: 'client_profile',
      data: { client_info: clientInfo }
    });
    setResult(res.data);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>👥 客户关系Agent</h1>
      <div style={{ marginTop: '20px' }}>
        <textarea
          placeholder="输入客户信息（公司名称、行业、规模等）"
          value={clientInfo}
          onChange={(e) => setClientInfo(e.target.value)}
          style={{ padding: '10px', width: '100%', height: '100px' }}
        />
        <button onClick={handleAnalyze} style={{ padding: '10px 20px', marginTop: '10px' }}>
          生成客户画像
        </button>
      </div>
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>分析结果</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
