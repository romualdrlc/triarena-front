<template>
  <q-card dark bordered class="bg-grey-9 my-card cursor-pointer" @click="goToTournamentView">
    <q-card-section>
      <div class="text-h6">{{ tournament.name }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      Le tournoi est : {{ tournament.status }}
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
