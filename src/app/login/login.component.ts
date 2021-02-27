import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticated?: boolean;
  failedLogin?: boolean;
  isAdmin?: boolean;
  errMsg?: string;
  login?: Login;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  submitLoginForm(form: NgForm) {
    this.fetchLoginIfAuthenticated(form.value.username, form.value.password);
  }

  fetchLoginIfAuthenticated(username: string, password: string){
    this.loginService.fetchLoginIfAuthenticated(username, password).subscribe(
      loginResponse => {
        this.login = loginResponse;
        if (this.login == null) {                   
          this.failedLogin = true;          
        }
        else if (this.login.roleId == 2){
          sessionStorage.clear();
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('role', "admin");
          this.router.navigate(["/adminHome"]) 
        }
        else if (this.login != null){
          sessionStorage.clear();
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('role', "user");
          this.router.navigate(["/userHome"]) 
        }        
      }
    );
  }

  authenticateLogin(username: string, password: string){
    return this.loginService.authenticateLogin(username, password).pipe(map(
      responseLogin => {
        this.authenticated = responseLogin;                      
      })
    );
  }

  checkIfAdmin(username: string) {
    return this.loginService.isAdmin(username).pipe(
      map(
        responseIsAdmin => {
          this.isAdmin = responseIsAdmin;           
        }
      )
    );
  }

}
