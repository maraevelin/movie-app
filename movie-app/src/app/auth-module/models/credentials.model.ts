export class Credentials {
  readonly email: string;
  readonly password: string;

  constructor(credentials: Credentials) {
    this.email = credentials.email;
    this.password = credentials.password;
  }
}
