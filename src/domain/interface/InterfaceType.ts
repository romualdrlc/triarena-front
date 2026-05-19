export interface TournamentCardRaw {
  name: string;
  slug: string;
  status: string;
}

export interface TournamentRaw {
  name: string;
  slug: string;
  status: string;
  teamList: string[];
  gameList: string[];
}

export interface PlayerRaw {
  pseudo: string;
  email: string;
  roles: string[];
}
