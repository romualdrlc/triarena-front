<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px; padding: 20px">
      <div class="text-h6 q-mb-md">Créer un compte</div>
      <q-form @submit="onRegister" class="q-gutter-md">
        <q-input v-model="form.pseudo" label="Pseudo complet" filled lazy-rules :rules="[val => !!val || 'Pseudo requis']" />
        <q-input v-model="form.email" label="Email" type="email" filled :rules="[val => !!val || 'Email requis']" />
        <q-input v-model="form.password" label="Mot de passe" type="password" filled :rules="[val => !!val || 'Requis']" />

        <q-btn label="S'inscrire" type="submit" color="primary" class="full-width" :loading="loading" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const auth = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const loading = ref(false);
const form = ref({ pseudo: '', email: '', password: '' });

const onRegister = async () => {
  loading.value = true;
  try {
    await auth.register(form.value.pseudo, form.value.email, form.value.password);
    $q.notify({ color: 'positive', message: 'Compte créé ! Connectez-vous.' });
    await router.push('/login');
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue";
    $q.notify({ color: 'negative', message: errorMessage });
  } finally {
    loading.value = false;
  }
};
</script>
