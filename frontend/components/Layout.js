import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const router = useRouter();

  const menuItems = [
    { name: '案件管理',   path: '/case-manager',    sub: ['智能立案', '流程引擎', '工时追踪'] },
    { name: '客户关系',   path: '/crm',             sub: ['客户画像', '需求预测', '关系维护'] },
    { name: '文书智能',   path: '/doc-intelligence', sub: ['文书生成', '合同审查', '多语言支持'] },
    { name: '财务效益',   path: '/finance',          sub: ['智能计费', '回款管理', '成本核算'] },
    { name: '市场引流',   path: '/marketing',        sub: ['内容引擎', '智能获客', '活动管理'] },
    { name: '知识库',     path: '/knowledge',        sub: ['智能检索', '法规追踪', '案例图谱'] },
    { name: '合规风控',   path: '/compliance',       sub: ['利益冲突审查', '风险评估'] },
    { name: '团队协作',   path: '/collaboration',    sub: ['项目空间', '智能排期', '任务分派'] },
    { name: '数据洞察',   path: '/analytics',        sub: ['经营仪表盘', '业务预测'] },
    { name: '跨境服务',   path: '/crossborder',      sub: ['自贸港政策', '外资架构设计'] },
    { name: '控制台',     path: '/settings',         sub: ['个人信息', '行程表', '修改密码'] },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="app-shell">
      {/* 顶部 Banner */}
      <header className="top-banner">
        <div className="top-banner-inner">
          <img
            src="/logo.png"
            alt="海南大成所"
            className="top-banner-logo"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="top-banner-text">
            <span className="top-banner-title">海南大成所AI矩阵办公平台</span>
          </div>
        </div>
        <div className="top-banner-user">
          <span className="top-banner-username">{user.name}</span>
          <button onClick={handleLogout} className="btn-logout-top">退出</button>
        </div>
      </header>

      <div className="app-body">
        {/* 侧边栏 */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {menuItems.map(item => (
              <div
                key={item.name}
                className="sidebar-item-wrap"
                onMouseEnter={() => setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.path}
                  className={`sidebar-item${router.pathname === item.path ? ' active' : ''}`}
                >
                  {item.name}
                </Link>
                {hoveredMenu === item.name && item.sub.length > 0 && (
                  <div className="sidebar-submenu">
                    {item.sub.map(s => (
                      <div key={s} className="sidebar-submenu-item">{s}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">{user.name?.[0] ?? '律'}</div>
              <div>
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-role">{user.role ?? '律师'}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* 主内容 */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
