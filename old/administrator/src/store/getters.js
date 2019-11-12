const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  permission_routes: state => state.permission.routes,
  // roles: state => state.admin.roles,
  // token: state => state.admin.token,
  openTab: state => state.tabPane.openTab,
  cacheTab: state => state.tabPane.cacheTab
};

export default getters;
