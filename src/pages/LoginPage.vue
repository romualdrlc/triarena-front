<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card overflow-hidden style="width: 400px; max-width: 90vw;">
      <q-card-section class="bg-primary text-white text-center q-pa-lg">
        <q-icon name="sports_kabaddi" size="54px" />
        <div class="text-h5 q-mt-md text-weight-bold">TriArena</div>
        <div class="text-subtitle2">Espace de compétition</div>
      </q-card-section>

      <q-card-section class="q-pa-xl">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            filled
            lazy-rules
            :rules="[val => !!val || 'L\'email est requis']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="form.password"
            label="Mot de passe"
            type="password"
            filled
            lazy-rules
            :rules="[val => !!val || 'Le mot de passe est requis']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <div class="q-mt-xl">
            <q-btn
              label="Se connecter"
              type="submit"
              color="primary"
              class="full-width"
              size="lg"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const auth = useAuthStore()
const router = useRouter()

const loading = ref(false)
const form = reactive({
  email: '',
  password: ''
})

onMounted(() => {
  if (auth.isAuthenticated) {
    router.push('/')
  }
})

const onSubmit = async () => {
  loading.value = true
  try {
    await auth.login({
      email: form.email,
      password: form.password
    })

    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: 'Connexion réussie !'
    })

    await router.push('/')
  } catch (error) {
    console.error('Erreur login:', error)
    $q.notify({
      color: 'negative',
      icon: 'warning',
      message: 'Identifiants invalides ou serveur indisponible.'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
