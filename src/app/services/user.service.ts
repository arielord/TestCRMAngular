import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Login } from '../interfaces/login';
import { AccountStatus } from '../interfaces/account-status';
import { Client } from '../interfaces/client';
import { UserDetails } from '../interfaces/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  capitalize(s: string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  findUserWithLogin(loginId: number): Observable<User>{
    return this.http.get<User>(``).pipe(catchError(this.errorHandler));
  }

  findUser(first: string, last: string, phonenumber: string): Observable<User>{
    return this.http.get<User>(`https://localhost:44335/api/User/GetUserByNameAndNumber?first=${first}&last=${last}&phonenumber=${phonenumber}`).pipe(catchError(this.errorHandler));
  }

  fetchCurrentUser(username: string): Observable<UserDetails>{
    return this.http.get<UserDetails>(`https://localhost:44335/api/Login/FetchUserWithLogin?username=${username}`).pipe(catchError(this.errorHandler));
  }

  fetchAllAccountStatuses(): Observable<AccountStatus[]>{
    return this.http.get<AccountStatus[]>('https://localhost:44335/api/AccountStatus/FetchAllAccountStatuses').pipe(catchError(this.errorHandler));
  }

  createLogin(login: Login): Observable<boolean>{
    return this.http.post<boolean>('https://localhost:44335/api/User/CreateLogin', login).pipe(catchError(this.errorHandler));
  }

  createClient(client: Client): Observable<boolean>{
    return this.http.post<boolean>('https://localhost:44335/api/User/CreateClient', client).pipe(catchError(this.errorHandler));
  }

  fetchAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>('https://localhost:44335/api/User/GetAllClients').pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
