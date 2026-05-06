import {AxiosResponse} from "axios";
import {api} from "boot/axios";
import Tournament from "src/domain/entity/Tournament";
import {TournamentCardRaw, TournamentRaw} from "src/domain/interface/InterfaceType";

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
