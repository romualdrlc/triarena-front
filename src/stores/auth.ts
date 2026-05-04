import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import axios from "axios";

export interface Player {
  pseudo: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    player: null as Player | null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(pseudo: string, email: string, password: string): Promise<Player> {
      try {
        const result = await api.post('/register', { pseudo, email, password });
        return result.data.user as Player;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data?.error || 'Erreur lors de l\'inscription';
        }
        throw 'Une erreur inattendue est survenue';
      }
    },
    async login(credentials: { email: string, password: string }) {
      try {
        const response = await api.post('/login', credentials);
        this.token = response.data.token;
        if (!(this.token)) {
          return false;
        }
        localStorage.setItem('token', this.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        return true;
      } catch (error) {
        throw 'Identifiants incorrects';
      }
    },
    logout() {
      this.token = null;
      this.player = null;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  },
})
