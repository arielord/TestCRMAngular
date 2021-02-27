import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from '../interfaces/user-details';
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';
import { BranchOffice } from '../interfaces/branch';
import { Entitlement } from '../interfaces/entitlement';
import { UserStatus } from '../interfaces/user-status';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user?: UserDetails;
  branchLocations?: BranchOffice[];
  entitlements?: Entitlement[];
  userStatuses?: UserStatus[];
  updated?: boolean;
  errMsg?: string;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.fetchBranchLocations();
    this.fetchEntitlements();
    this.fetchUserStatuses();
    this.user = {
      userId: this.route.snapshot.params['id'] as number,
      firstName: this.route.snapshot.params['first'],
      lastName: this.route.snapshot.params['last'],
      dateOfBirth: this.route.snapshot.params['dob'],
      phoneNumber: this.route.snapshot.params['phonenumber'],
      branchOfficeLocation: this.route.snapshot.params['branch'],
      userStatusDesc: this.route.snapshot.params['status'],
      entitlementDesc: this.route.snapshot.params['entitlement'],
    }
    console.log(this.user);
  }

  submitEditForm(form: NgForm){
    this.updateUser(this.user);
  }

  updateUser(user: UserDetails){
    this.adminService.updateUser(user).subscribe(
      response => {
        this.updated = response;
        if(this.updated){
          this.router.navigate(['adminHome']);
        }
        else{
          alert('User did not save successfully');
        }
      },
      errorResponse => {
        this.errMsg = errorResponse;
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

}
