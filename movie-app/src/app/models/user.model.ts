export class User {
  readonly email: string;
  readonly password: string;

  constructor(user: User) {
    this.email = user.email;
    this.password = user.password;
  }
}
