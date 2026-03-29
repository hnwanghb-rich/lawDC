import Layout from '../components/Layout';

export default function Marketing() {
  const features = [
    { name: '内容引擎', desc: '智能生成法律科普文章、案例解析，提升律所品牌影响力' },
    { name: '智能获客', desc: '精准识别潜在客户需求，自动化跟进与转化管理' },
    { name: '活动管理', desc: '法律讲座、研讨会等活动的全流程策划与执行管理' },
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />市场引流</h1>
          <p className="page-subtitle">内容引擎、智能获客与活动管理</p>
        </div>

        <div className="stats-grid">
          {features.map(f => (
            <div key={f.name} className="card" style={{ marginBottom: 0 }}>
              <div className="card-title">{f.name}</div>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="empty-state">
            <div className="empty-state-text">市场引流功能正在建设中，敬请期待</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
