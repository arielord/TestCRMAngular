import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {
  isTrustOfficer: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isTrustOfficer = "Trust Officer" == sessionStorage.getItem('entitlementDesc');
  }

  ngAfterViewInit() {
    this.isTrustOfficer = "Trust Officer" == sessionStorage.getItem('entitlementDesc');
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
