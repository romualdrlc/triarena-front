<template>
  <q-layout view="lHh Lpr lFf">
      <q-toolbar class="bg-primary text-white q-my-md shadow-2">
        <q-btn flat dense label="Tri Arena" class="q-mr-sm" @click="goToHomePage"/>
        <q-separator dark vertical inset />
        <q-btn dense flat label="Team" class="q-mr-sm" @click="goToTeamPAge"/>

        <q-space />

        <q-separator dark vertical />
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

const goToTeamPAge = async () => {
  await router.push('/team');
}

const goToHomePage = async () => {
  await router.push('/');
}
</script>
