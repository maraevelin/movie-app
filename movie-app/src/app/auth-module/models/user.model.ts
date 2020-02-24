export class User {
  public readonly id: string | undefined;
  public readonly email: string | undefined;

  constructor(userCredential: firebase.auth.UserCredential) {
    const user = userCredential.user;
    this.id = user ? user.uid : undefined;
    this.email = user && user.email ? user.email : undefined;
  }
}
