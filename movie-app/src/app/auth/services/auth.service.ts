import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConfirmResetPasswordModel } from './models/confirm-reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebase: AngularFireAuth) {}

  signUp(credentials: Credentials): Observable<firebase.auth.UserCredential> {
    return from(
      this.firebase.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signIn(credentials: Credentials): Observable<firebase.auth.UserCredential> {
    return from(
      this.firebase.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signOut(): Observable<void> {
    return from(this.firebase.auth.signOut());
  }

  requestResetPasswordLink(email: string): Observable<void> {
    return from(this.firebase.auth.sendPasswordResetEmail(email));
  }

  verifyResetPasswordCode(oobCode: string): Observable<string> {
    return from(this.firebase.auth.verifyPasswordResetCode(oobCode));
  }

  confirmResetPassword(confirm: ConfirmResetPasswordModel): Observable<void> {
    return from(
      this.firebase.auth.confirmPasswordReset(confirm.oobCode, confirm.password)
    );
  }
}
