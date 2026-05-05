<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> TriArena </q-toolbar-title>

        <div v-if="auth.token" class="row items-center q-gutter-sm">
          <q-icon name="account_circle" size="sm" />
          <span>{{ auth.player?.pseudo || 'Utilisateur' }}</span>
          <q-btn flat round dense icon="logout" @click="confirmLogout" />
        </div>

        <div v-else class="q-gutter-sm">
          <q-btn flat label="Connexion" to="/login" />
          <q-btn outline label="S'inscrire" to="/register" />
        </div>

      </q-toolbar>
    </q-header>
Ò
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const confirmLogout = async () => {
  auth.logout();
  await router.push('/login');
}
</script>
