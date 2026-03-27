import { useState } from 'react';
import axios from 'axios';

export default function Knowledge() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'knowledge',
      type: 'search',
      data: { query }
    });
    setResult(res.data.message);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>📚 知识库Agent</h1>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="搜索法律知识"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', width: '400px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          搜索
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
