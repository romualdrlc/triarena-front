<template>
  <q-page class="q-pa-md">
    <div v-if="tournament">
      <div class="column items-center q-gutter-y-md">
        <h1 class="text-h4 items-center">{{ tournament.getName() }}</h1>
        <div class="col-12 full-width" style="max-width: 600px;">
          <q-card bordered flat>
            <q-card-section class="text-h6">Liste des joueurs</q-card-section>
            <q-separator />
            <q-card-section>
              <draggable
                v-model="playerList"
                group="tournament"
                item-key="email"
                class="row q-gutter-sm justify-center"
                @end="onDragEnd"
                :sort="false"
              >
                <template #item="{element}">
                  <q-badge
                    outline
                    color="primary"
                    class="q-pa-md cursor-pointer player-badge"
                    :data-pseudo="element.pseudo"
                    :data-email="element.email"
                  >
                    {{ element.pseudo }}
                  </q-badge>
                </template>
              </draggable>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 full-width" style="max-width: 600px;">
          <q-card bordered flat>
            <q-card-section class="text-h6">Équipes</q-card-section>
            <q-separator />
            <q-card-section class="column items-center q-gutter-y-sm">
              <q-badge color="red" v-for="team in teamList" :key="team.name" class="q-mb-sm">
                <div>Nom de l'equipe : {{ team.name }}</div>
              </q-badge>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 full-width" style="max-width: 600px;">
          <q-card bordered flat>
            <q-card-section class="text-h6">Jeux</q-card-section>
            <q-separator />
            <q-card-section>{{ tournament.getGameList() }}</q-card-section>
          </q-card>
        </div>
      </div>
      <q-avatar
        size="100px"
        font-size="20px"
        color="primary"
        text-color="white"
        class="absolute-bottom-right q-mb-xl "
      >{{ tournament.getStatus() }}</q-avatar>
    </div>

    <div v-else class="flex flex-center q-mt-xl">
      <q-spinner-dots color="primary" size="3em" />
    </div>
    <q-btn
      flat
      icon="arrow_back"
      label="Retour aux tournois"
      @click="$router.push('/')"
      class="q-mb-xl absolute-bottom-left"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiServer from "src/domain/service/ApiServer";
import Tournament from "src/domain/entity/Tournament";
import {PlayerRaw, TeamList} from "src/domain/interface/InterfaceType";
import draggable from 'vuedraggable';
import {useQuasar} from "quasar";

const route = useRoute();
const apiServer = new ApiServer();
const $q = useQuasar();

const tournament = ref<Tournament | null>(null);
const playerList = ref<PlayerRaw[]>([{
  pseudo: '',
  email: '',
  roles: [''],
}]);
const tournamentSlug = route.params.slug as string;
const teamList = ref<TeamList[]>([]);

onMounted(async () => {
  tournament.value = await apiServer.getTournamentBySlug(tournamentSlug);
  await getPlayerList();
  // a voir pour initialisé la aussi la teamList.
});

const getPlayerList = async () => playerList.value = await apiServer.getPlayerList();

const onDragEnd = (evt) => {
  const mouseEvent = evt.originalEvent;
  const x = mouseEvent.clientX || (mouseEvent.changedTouches && mouseEvent.changedTouches[0].clientX);
  const y = mouseEvent.clientY || (mouseEvent.changedTouches && mouseEvent.changedTouches[0].clientY);

  const elementAtPoint = document.elementFromPoint(x, y);

  const targetBadge = elementAtPoint?.closest('.player-badge');
  if (targetBadge) {
    const sourcePlayer = evt.item._underlying_vm_;
    const sourceEmail = sourcePlayer?.email;
    const sourcePseudo = sourcePlayer?.pseudo;

    const targetPseudo = targetBadge.getAttribute('data-pseudo');
    const targetPlayer = playerList.value.find(p => p.pseudo === targetPseudo);
    const targetEmail = targetPlayer?.email;

    if (targetPseudo && targetEmail && (sourcePseudo !== targetPseudo)) {
      triggerTeamNotification(sourcePseudo, targetPseudo, sourceEmail, targetEmail);
    }
  }
};

const triggerTeamNotification = (sourcePseudo: string, targetPseudo: string, sourceEmail: string, targetEmail: string) => {
  $q.notify({
    message: `Créer une équipe avec ${sourcePseudo} et ${targetPseudo} ?`,
    color: 'primary',
    icon: 'group_add',
    position: 'center',
    timeout: 0,
    actions: [
      {
        label: 'Confirmer',
        color: 'yellow',
        handler: () => {
          registerTeam(sourceEmail, targetEmail);
        }
      },
      { label: 'Annuler', color: 'white' }
    ]
  });
};

const registerTeam = async (p1Email: string, p2Email: string) => {
  const result = await apiServer.registerTeamWithTournamentSlugAndPlayer(tournamentSlug, p1Email, p2Email);
  if (result.isTeamCreated) {
    $q.notify({
      message: 'Équipe créée avec succès !',
      color: 'green',
      icon: 'check',
      position: 'center',
    });
    await getPlayerList();
    teamList.value = [];
    for (const team of result.teamList) {
      teamList.value.push({
        name: team.name,
        player1: team.player1,
        player2: team.player2,
      });
    }
  }
}
</script>

<style scoped>
</style>
