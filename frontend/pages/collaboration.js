import Layout from '../components/Layout';

export default function Collaboration() {
  const features = [
    { name: '项目空间', desc: '为每个案件创建独立协作空间，集中管理文件与沟通记录' },
    { name: '智能排期', desc: '基于案件截止日期与律师工作量自动优化任务排期' },
    { name: '任务分派', desc: '智能匹配律师专长，高效分配案件任务与工作职责' },
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />团队协作</h1>
          <p className="page-subtitle">项目空间、智能排期与任务分派</p>
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
            <div className="empty-state-text">团队协作功能正在建设中，敬请期待</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
