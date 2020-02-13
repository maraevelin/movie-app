import { iUser } from './iUser';

export class User {
  readonly email: string;
  readonly password: string;

  constructor(user: iUser) {
    this.email = user.email;
    this.password = user.password;
  }
}
