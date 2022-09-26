import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {catchError, retry, throwError} from "rxjs";

const TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath: string = 'http://localhost:3000/api/v1/auth';
  httpOptions = { headers: new HttpHeaders({ 'Content/type': 'application/json' }) };
  currentUser!: User;

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  signIn(user:User) {
    return this.http.post(`${this.basePath}/sign-in`, user, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(accessToken: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  }

  get isSignedIn(): boolean {
    let accessToken = this.getToken();
    return accessToken != null;
  }


  signOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
