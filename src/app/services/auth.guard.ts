import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('role') != 'user'){
        alert('You are not allowed to view this page');
        this.router.navigate(['/login']);
        return false;
      }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('role') != 'admin'){
        alert('You are not allowed to view this page');
        // this.router.navigate(['/login']);
        this.location.back();
        return false;
      }
    return true;
  }
}
