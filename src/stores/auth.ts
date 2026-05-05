import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import axios from "axios";
import Player from "src/domain/entity/Player";

export interface PlayerInterface {
  pseudo: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    player: JSON.parse(localStorage.getItem('player') || 'null') as PlayerInterface | null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(pseudo: string, email: string, password: string): Promise<Player> {
      try {
        const result = await api.post('/register', { pseudo, email, password });
        const newPlayer = new Player(result.data.user.pseudo, result.data.user.email);
        this.player = { pseudo: newPlayer.getPseudo(), email: newPlayer.getEmail() };
        return newPlayer;
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
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.player = {
          pseudo: response.data.user.name,
          email: response.data.user.email
        };
        localStorage.setItem('token', this.token);
        localStorage.setItem('player', JSON.stringify(this.player));
        return true;
      } catch (error) {
        throw 'Identifiants incorrects';
      }
    },
    logout() {
      this.token = null;
      this.player = null;
      localStorage.removeItem('token');
      localStorage.removeItem('player');
      delete api.defaults.headers.common['Authorization'];
    }
  },
})
