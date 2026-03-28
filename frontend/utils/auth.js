// 登录状态检查工具
export const checkAuth = () => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token');
  return !!token;
};

export const redirectToLogin = (router) => {
  router.push('/login');
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = (router) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
