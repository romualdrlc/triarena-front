import { defineBoot } from '#q-app/wrappers'
import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from "stores/auth";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default defineBoot(({ app, router }) => {

  // --- INTERCEPTEUR DE REQUÊTE ---
  // On injecte le token dynamiquement à CHAQUE appel
  api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // --- INTERCEPTEUR DE RÉPONSE ---
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Si 401, le token est expiré ou invalide
      if (error.response && error.response.status === 401) {
        const authStore = useAuthStore();

        // On nettoie tout
        authStore.logout();

        // Redirection forcée vers login si on n'y est pas
        if (router.currentRoute.value.path !== '/login') {
          await router.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api }
