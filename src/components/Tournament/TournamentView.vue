<template>
  <q-page class="q-pa-md">
    <q-btn
      flat
      icon="arrow_back"
      label="Retour aux tournois"
      @click="$router.push('/')"
      class="q-mb-md"
    />

    <div v-if="tournament" class="column q-gutter-y-md">
      <h1 class="text-h4">{{ tournament.getName() }}</h1>

      <q-badge :label="tournament.getStatus()" color="primary" />

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-card bordered flat>
            <q-card-section class="text-h6">Équipes</q-card-section>
            <q-separator />
            <q-card-section>
              {{ tournament.getTeamList() }}
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card bordered flat>
            <q-card-section class="text-h6">Jeux</q-card-section>
            <q-separator />
            <q-card-section>
              {{ tournament.getGameList() }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-center q-mt-xl">
      <q-spinner-dots color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiServer from "src/domain/service/ApiServer";
import Tournament from "src/domain/entity/Tournament";

const route = useRoute();
const apiServer = new ApiServer();

const tournament = ref<Tournament | null>(null);

onMounted(async () => {
  console.log(route.params);
  const tournamentSlug = route.params.slug as string;
  tournament.value = await apiServer.getTournamentBySlug(tournamentSlug);
});
</script>
