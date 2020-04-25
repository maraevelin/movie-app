import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase/app';
import { Credentials } from '../models/credentials.model';
import { ConfirmResetPasswordModel } from './models/confirm-reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  signUp(credentials: Credentials): Observable<firebase.auth.UserCredential> {
    return from(
      this.angularFireAuth.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signIn(credentials: Credentials): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
  }

  signOut(): Observable<void> {
    return from(this.angularFireAuth.auth.signOut());
  }

  requestResetPasswordLink(email: string): Observable<void> {
    return from(this.angularFireAuth.auth.sendPasswordResetEmail(email));
  }

  verifyResetPasswordCode(oobCode: string): Observable<string> {
    return from(this.angularFireAuth.auth.verifyPasswordResetCode(oobCode));
  }

  confirmResetPassword(confirm: ConfirmResetPasswordModel): Observable<void> {
    return from(
      this.angularFireAuth.auth.confirmPasswordReset(confirm.oobCode, confirm.password)
    );
  }
}
