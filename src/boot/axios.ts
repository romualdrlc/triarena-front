import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import {useAuthStore} from "stores/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const token: string | null = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ app, router }) => {

  // --- INTERCEPTEUR DE RÉPONSE ---
  api.interceptors.response.use(
    (response) => response, // Si tout va bien, on renvoie la réponse
    async (error) => {
      // Si on reçoit une erreur 401 (Non autorisé / Expire)
      console.log('titi', error.response);;
      if (error.response && error.response.status === 401) {
        const authStore = useAuthStore();

        // On nettoie le store et le localStorage (méthode qu'on a créée ensemble)
        authStore.logout();

        // Redirection vers le login
        // On évite de rediriger si on y est déjà pour éviter les boucles
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

export { axios, api }
