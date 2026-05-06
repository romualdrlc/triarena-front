<template>
  <div class="q-pa-md row q-col-lg justify-around">
    <TournamentCard
        v-for="tournament in tournamentList"
        :key="tournament.name"
        :tournament="tournament"
        class="tournament col-12 col-md-4"
        style="max-width: 400px;"
      />
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import ApiServer from "src/domain/service/ApiServer";
import TournamentCard from "components/Tournament/TournamentCard.vue";
import {TournamentCardRaw} from "src/domain/interface/InterfaceType";

const apiServer = new ApiServer();
const tournamentList = ref<TournamentCardRaw[]>([]);

onMounted(async () => {
  tournamentList.value = await apiServer.getTournamentList()
})
</script>

<style scoped>

</style>
