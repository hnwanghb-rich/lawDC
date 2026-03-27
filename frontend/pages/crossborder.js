import { useState } from 'react';
import axios from 'axios';

export default function CrossBorder() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleQuery = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'crossborder',
      type: 'ftz_policy',
      data: { query }
    });
    setResult(res.data.message);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>🌏 跨境服务Agent</h1>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="查询自贸港政策"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', width: '400px' }}
        />
        <button onClick={handleQuery} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          查询
        </button>
      </div>
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
