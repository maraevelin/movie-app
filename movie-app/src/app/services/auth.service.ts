import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { SignUpResponse } from './models/SignUpResponse';
import { SignInResponse } from './models/SignInResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiKey = `?key=${environment.firebaseApiKey}`;

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<SignUpResponse> {
    const url = `${environment.firebaseApiUrl}:signUp`;
    return this.http.post<SignUpResponse>(url, user);
  }

  signin(user: User): Observable<SignInResponse> {
    const url = `${environment.firebaseApiUrl}:signInWithPassword`;
    return this.http.post<SignInResponse>(url, user);
  }
}
