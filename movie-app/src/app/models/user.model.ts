import { SignInResponse } from '../services/models/sign-in-response.model';

export class User {
  public readonly id: string;
  public readonly email: string;
  private readonly _token: string;
  private readonly _tokenExpirationDate: Date;

  constructor(signInResponse: SignInResponse) {
    this.id = signInResponse.localId;
    this.email = signInResponse.email;
    this._token = signInResponse.idToken;
    this._tokenExpirationDate = new Date(
      new Date().getTime() + Number(signInResponse.expiresIn) * 1000
    );
  }

  get token(): string | null {
    if (!this._token || this._tokenExpirationDate < new Date()) {
      return null;
    }

    return this._token;
  }
}
