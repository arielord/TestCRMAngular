import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchOffice } from '../interfaces/branch';
import { Entitlement } from '../interfaces/entitlement';
import { User } from '../interfaces/user';
import { UserDetails } from '../interfaces/user-details';
import { UserStatus } from '../interfaces/user-status';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  branchLocations: BranchOffice[];
  entitlements: Entitlement[];
  userStatuses: UserStatus[];
  user: UserDetails;
  created: boolean;
  today: string;

  constructor(private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {  
    let date = new Date();
    let month = date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString();
    let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();    
    this.today = date.getFullYear().toString() + '-' + month + '-' + day; 
       
    this.fetchBranchLocations();
    this.fetchEntitlements();
    this.fetchUserStatuses();
    this.user = {
      userId: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      phoneNumber: '',
      branchOfficeLocation: '',
      userStatusDesc: '',
      entitlementDesc: '',
    }

    this.createUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10}$/), Validators.required]],
      dateOfBirth: ['', [Validators.required, this.checkDate]],
      status: ['', [Validators.required]],
      entitlement: ['', [Validators.required]]
    });
  }

  submitCreateForm(form: any){
    console.log(this.user);
    this.createUser(this.user);
  }

  createUser(user: UserDetails){
    this.adminService.createUser(user).subscribe(
      response => {
        this.created = response
        if(this.created){
          this.router.navigate(['adminHome']);
        }
      }
    );
  }

  fetchBranchLocations(){
    this.adminService.fetchBranchLocations().subscribe(
      response => {
        this.branchLocations = response;
      }
    );
  }

  fetchEntitlements(){
    this.adminService.fetchEntitlements().subscribe(
      response => {
        this.entitlements = response;
      }
    );
  }

  fetchUserStatuses(){
    this.adminService.fetchUserStatuses().subscribe(
      response => {
        this.userStatuses = response;
      }
    );
  }

  cancel(){
    this.router.navigate(['adminHome']);
  }

  checkDate(control: FormControl) {
    var currentDate = new Date();
    var givenDate = new Date(control.value)  
    if (givenDate <= currentDate || givenDate == null) {    
      return null
    }
    else {
      return {
        dateError: {
          message: "Enter a date less than today's date"
        }
      };
    }
  }

}
