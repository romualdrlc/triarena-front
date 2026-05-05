export default class Player {

  private readonly pseudo: string;
  private readonly email: string

  constructor(pseudo: string, email: string) {
    this.pseudo = pseudo;
    this.email = email;
  }

  public getPseudo(): string {
    return this.pseudo;
  }

  public getEmail(): string {
    return this.email;
  }
}
