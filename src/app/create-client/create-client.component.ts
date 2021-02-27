import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountStatus } from '../interfaces/account-status';
import { Client } from '../interfaces/client';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  createClientForm: FormGroup;
  clientCreated: boolean;
  client: Client;
  user: User;
  accountStatuses: AccountStatus[];
  errMsg: string;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fetchAllAccountStatuses();
    this.client = {
      id: 0,
      clientId: '',
      firstName: '',
      middleName: null,
      lastName: '',
      dateOfBirth: null,
      assetValue: null as number,
      homePhoneNumber: '',
      officePhoneNumber: null,
      email: null,
      driversLicenseIdNum: null,
      userId: 2,
      accountStatusId: null
    }

    this.createClientForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: ['', []],
      lastName: ['', [Validators.required]],
      assetValue: ['', [Validators.required, Validators.pattern(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/)]],
      homePhoneNumber: ['', [Validators.pattern(/^[0-9]{10}$/), Validators.required]],
      officePhoneNumber: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      driversLicenseIdNum: ['', []],
      dateOfBirth: ['', [Validators.required, checkDate]],
      accountStatus: ['', [Validators.required]]
    });
  }

  submitCreateClientForm(form: FormGroup){
    console.log(this.client);
    this.createClient();
  }

  createClient(){
    this.userService.createClient(this.client).subscribe(
      response => {
        this.clientCreated = response;
        if(this.clientCreated){
          this.router.navigate(['adminHome']);
        }
        else{
          alert('Client could not be saved');
        }
      }
    );
  }

  fetchAllAccountStatuses(){
    this.userService.fetchAllAccountStatuses().subscribe(
      response => {        
        this.accountStatuses = response;
      }
    );
  }

  cancel(){
    this.router.navigate(['userHome']);
  }
}

function checkDate(control: FormControl) {
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
