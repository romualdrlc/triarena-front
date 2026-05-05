export default class Tournament {

  private readonly name: string;
  private readonly slug: string;
  private readonly status: string;
  private readonly teamList: string[] = [];
  private readonly gameList: string[] = [];

  public constructor(name: string, slug: string, status: string, teamList: string[], gameList: string[]) {
    this.name = name;
    this.slug = slug;
    this.status = status;
    this.teamList = teamList;
    this.gameList = gameList;
  }

  public getName(): string {
    return this.name;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getStatus(): string {
    return this.status;
  }

  public getTeamList(): string[] {
    return this.teamList;
  }

  public getGameList(): string[] {
    return this.gameList;
  }
}
