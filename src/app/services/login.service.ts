import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticateLogin(username: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:44335/api/Login/IsAuthenticated?username=${username}&password=${password}`).pipe(catchError(this.errorHandler));
  }

  isAdmin(username: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:44335/api/Login/IsAdmin?username=${username}`).pipe(catchError(this.errorHandler));
  }

  fetchLoginIfAuthenticated(username: string, password: string): Observable<Login>{
    return this.http.get<Login>(`https://localhost:44335/api/Login/FetchLoginIfAuthenticated?username=${username}&password=${password}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
