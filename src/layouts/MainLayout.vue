<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> TriArena </q-toolbar-title>

        <div v-if="auth.isLoggedIn" class="row items-center q-gutter-sm">
          <q-icon name="account_circle" size="sm" />
          <span>{{ auth.user?.name }}</span>
          <q-btn flat round dense icon="logout" @click="confirmLogout" />
        </div>
        <q-btn v-else flat label="Connexion" to="/login" />

      </q-toolbar>
    </q-header>

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
  await auth.logout();
  await router.push('/login');
}
</script>
