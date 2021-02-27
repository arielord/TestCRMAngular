import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user?: User;
  login?: Login;
  loginCreated?: boolean;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loginCreated = true;
  }

  submitUserForm(form: NgForm){
    this.findUser(form.value.firstName, form.value.lastName, form.value.phonenumber);
  }

  submitRegistrationForm(form: NgForm){
    this.login = {
      userId: this.user.userId,
      username: form.value.username,
      password: form.value.password,
      roleId: 1
    }
    this.createLogin(this.login);
  }

  findUser(firstName: string, lastName: string, phonenumber: string){
    this.userService.findUser(firstName, lastName, phonenumber).subscribe(
      response => {
        this.user = response;
        if(this.user != null){
          sessionStorage.clear();
          sessionStorage.setItem("userId", this.user.userId.toString());
        }
        else{
          alert("You are not authorized to register. If you think this is a mistake, please reach out to admin.")
        }
      },
      error => {
        alert(error);
      }
    );
  }

  createLogin(login: Login){
    this.userService.createLogin(login).subscribe(
      response => {
        this.loginCreated = response;
        if(this.loginCreated){          
          this.router.navigate(['/user', login.userId]);
        }        
        else {
          console.log("login creation failed");
        }
      }
    );
  }

}
