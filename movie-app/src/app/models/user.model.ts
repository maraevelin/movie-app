export class User {
  public readonly id: string | null;
  public readonly email: string | null;

  constructor(userCredential: firebase.auth.UserCredential) {
    const user = userCredential.user;
    this.id = !!user ? user.uid : null;
    this.email = !!user ? user.email : null;
  }
}
