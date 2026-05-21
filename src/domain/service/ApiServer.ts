import {AxiosResponse} from "axios";
import {api} from "boot/axios";
import Tournament from "src/domain/entity/Tournament";
import {PlayerRaw, TeamRegisteredRaw, TournamentCardRaw, TournamentRaw} from "src/domain/interface/InterfaceType";

export default class ApiServer {

  public getMe(): Promise<{pseudo: string; email: string;} | null> {
    return this.get<{pseudo: string; email: string;} | null>('/me');
  }

  public async getTournamentList(): Promise<{name: string; slug: string, status: string;}[]> {
    const result = await this.get<TournamentCardRaw[]>('/tournaments');
    const tournamentList: {name: string; slug: string, status: string;}[] = [];
    for (const tournament of result) {
      tournamentList.push({
        name: tournament.name,
        slug: tournament.slug,
        status: tournament.status
      });
    }
    return tournamentList;
  }

  public async getTournamentBySlug(slug: string): Promise<Tournament> {
    const result = await this.get<TournamentRaw>(`/tournament/${slug}`);
    return new Tournament(result.name, result.slug, result.status, result.teamList, result.gameList);
  }

  public async getPlayerList(): Promise<PlayerRaw[]> {
    const result = await this.get<{pseudo: string; email: string; roles: string[]}[]>('/players');
    if (result.length === 0) {
      return [];
    }
    return result.map((player: PlayerRaw) => ({
      pseudo: player.name,
      email: player.email,
      roles: player.roles
    }));
  }

  public async registerTeamWithTournamentSlugAndPlayer(slug: string, playerOneMail: string, playerTwoMail: string): Promise<TeamRegisteredRaw> {
    const result = await this.post<TeamRegisteredRaw[]>(`/tournament/${slug}/team`, { playerOneMail, playerTwoMail });
    return {
      isTeamCreated: result.message,
      teamList: result.teamList.map((team: { id: any; name: any; player1: { name: any; email: any; }; player2: { name: any; email: any; }; }) => ({
        id: team.id,
        name: team.name,
        player1: {
          pseudo: team.player1.name,
          email: team.player1.email
        },
        player2: {
          pseudo: team.player2.name,
          email: team.player2.email
        }
      }))
    };
  }

  // --- WRAPPERS AXIOS (PRIVÉS) ---
  private async get<T>(url: string, params = {}): Promise<T> {
    const response: AxiosResponse<T> = await api.get(url, { params });
    return response.data;
  }

  private async post<T>(url: string, data: object): Promise<T> {
    const response: AxiosResponse<T> = await api.post(url, data);
    return response.data;
  }

  private async put<T>(url: string, data: object): Promise<T> {
    const response: AxiosResponse<T> = await api.put(url, data);
    return response.data;
  }
}
