<template>
  <q-card dark bordered class="bg-grey-9 my-card text-center">
    <q-card-section>
      <div class="text-h6">{{ tournament.name }}</div>
    </q-card-section>

    <q-separator color="white" inset/>

    <q-card-section>
      Le tournoi est : {{ tournament.status }}
    </q-card-section>

    <q-separator color="white" inset/>

    <q-card-section>
      <q-btn flat color="primary" @click="goToTournamentView"> Participe !</q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const props = defineProps<{
  tournament: {name: string; slug: string, status: string;}
}>();
const router = useRouter();

const tournament = props.tournament;

function goToTournamentView(): void {
  router.push({
    name: 'tournament-view',
    params: {slug: tournament.slug }
  });
}

</script>

<style scoped>

</style>
