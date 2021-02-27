import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserDetails } from '../interfaces/user-details';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  //users: User[];
  users?: UserDetails[];

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.fetchAllUserDetails();
  }

  fetchAllUserDetails(){
    this.adminService.fetchAllUserDetails().subscribe(
      response => {
        this.users = response;
      }
    );
  }

  editUser(user: UserDetails){
    this.router.navigate(['/editUser',
      user.userId,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.phoneNumber,
      user.branchOfficeLocation,
      user.userStatusDesc,
      user.entitlementDesc
    ]);
  }

}
