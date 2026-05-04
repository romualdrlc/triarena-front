import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import {useAuthStore} from "stores/auth";

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    const auth = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    console.log('Navigating to:', to.path, 'Requires Auth:', requiresAuth, 'Has Token:', !!auth.token);
    if (requiresAuth && !auth.token) {
      return { name: 'login' };
    }
    if (auth.token && (to.name === 'login' || to.name === 'register')) {
      return { name: 'home' };
    }
  });

  return Router;
});
