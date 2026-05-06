<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import ApiServer from "src/domain/service/ApiServer";

const authStore = useAuthStore();
const apiServer = new ApiServer();

onMounted(async () => {
  if (authStore.token) {
    try {
      // Optionnel : Appel un endpoint "check-auth" ou "me" pour vérifier le token
      // Si le token est expiré, l'intercepteur 401 fera le logout automatiquement.
      await apiServer.getMe();
    } catch (e) {
      console.log('Token expiré ou serveur injoignable');
    }
  }
});
</script>
