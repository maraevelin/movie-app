import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebase: AngularFireAuth) {}

  signup(credentials: Credentials): Observable<firebase.auth.UserCredential> {
    return from(
      this.firebase.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signin(credentials: Credentials): Observable<firebase.auth.UserCredential> {
    return from(
      this.firebase.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signout(): Observable<void> {
    return from(this.firebase.auth.signOut());
  }
}
