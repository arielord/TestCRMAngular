import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserDetails } from '../interfaces/user-details';
import { UserStatus } from '../interfaces/user-status';
import { BranchOffice } from '../interfaces/branch';
import { Entitlement } from '../interfaces/entitlement';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createUser(user: UserDetails): Observable<boolean>{
    return this.http.post<boolean>('https://localhost:44335/api/Admin/CreateUser', user).pipe(catchError(this.errorHandler));
  }

  updateUser(user: UserDetails): Observable<boolean>{
    return this.http.put<boolean>('https://localhost:44335/api/Admin/UpdateUser', user).pipe(catchError(this.errorHandler));
  }

  fetchAllUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://localhost:44335/api/User/GetAllUsers').pipe(catchError(this.errorHandler));
  }

  fetchAllUserDetails(): Observable<UserDetails[]>{
    return this.http.get<UserDetails[]>('https://localhost:44335/api/Admin/FetchAllUserDetails').pipe(catchError(this.errorHandler));
  }  

  fetchUserStatuses(): Observable<UserStatus[]>{
    return this.http.get<UserStatus[]>('https://localhost:44335/api/UserStatus/FetchAllUserStatuses').pipe(catchError(this.errorHandler));
  }

  fetchBranchLocations(): Observable<BranchOffice[]>{
    return this.http.get<BranchOffice[]>('https://localhost:44335/api/BranchOffice/FetchAllBranchOffices').pipe(catchError(this.errorHandler));
  }

  fetchEntitlements(): Observable<Entitlement[]>{
    return this.http.get<Entitlement[]>('https://localhost:44335/api/Entitlement/FetchAllEntitlements').pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
