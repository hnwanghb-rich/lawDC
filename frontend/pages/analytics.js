import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Analytics() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'analytics',
        type: 'dashboard',
        data: {}
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDashboard(res.data);
    } catch (error) {
      // 使用示例数据展示
      setDashboard({ loaded: true });
    }
    setLoading(false);
  };

  const stats = [
    { label: '本月营收', value: '1,500,000', unit: '元' },
    { label: '在办案件', value: '45', unit: '件' },
    { label: '服务客户', value: '30', unit: '家' },
    { label: '回款率', value: '85', unit: '%' },
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />数据洞察</h1>
          <p className="page-subtitle">经营仪表盘与业务预测分析</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={loadDashboard} disabled={loading} className="btn btn-outline btn-sm">
            {loading ? '加载中...' : '刷新数据'}
          </button>
        </div>

        {(dashboard || !loading) && (
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">
                  {s.value}
                  <span className="stat-unit">{s.unit}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card">
          <div className="empty-state">
            <div className="empty-state-text">详细图表分析功能正在建设中，敬请期待</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
