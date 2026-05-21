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

export interface TeamRegisteredRaw {
  isTeamCreated: boolean;
  teamList: {
    id: number;
    name: string;
    player1: { pseudo: string; email: string };
    player2: { pseudo: string; email: string };
  }[];
}

export interface TeamList {
  name: string;
  player1: { pseudo: string; email: string };
  player2: { pseudo: string; email: string };
}
