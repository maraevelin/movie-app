import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { environment } from 'src/environments/environment';
import { SignUpResponse } from './models/sign-up-response.model';
import { SignInResponse } from './models/sign-in-response.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(credentials: Credentials): Observable<SignUpResponse> {
    const url = `${environment.firebaseApiUrl}:signUp`;
    return this.http.post<SignUpResponse>(url, credentials).pipe(
      catchError(error => {
        throw new Error(error.error.error.message);
      })
    );
  }

  signin(credentials: Credentials): Observable<SignInResponse> {
    const url = `${environment.firebaseApiUrl}:signInWithPassword`;
    return this.http.post<SignInResponse>(url, credentials).pipe(
      catchError(error => {
        throw new Error(error.error.error.message);
      })
    );
  }
}
