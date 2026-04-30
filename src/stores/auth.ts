import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false
  }),
  actions: {
    async login(credentials: any) {
      try {
        const response = await api.post('/login', credentials)
        this.user = response.data
        this.isLoggedIn = true
        return response.data
      } catch (error) {
        await this.logout()
        throw error
      }
    },
    async logout() {
      try {
        await api.post('/logout').catch(() => { });
      } finally {
        this.user = null;
        this.isLoggedIn = false;
        console.log('Déconnexion locale effectuée');
      }
    }
  },
  persist: true
})
