const state = { routes: [], partialRoutes: [] };

const getters = {
  routes: (state: any) => state.routes,
  partialRoutes: (state: any) => state.partialRoutes,
};
const router = { name:"router",state, getters }
export default router;
