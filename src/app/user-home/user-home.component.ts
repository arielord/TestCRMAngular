import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../interfaces/client';
import { UserDetails } from '../interfaces/user-details';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  clients?: Client[];
  filteredClients?: Client[];
  currentUser?: UserDetails;
  searchBy?: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.fetchAllClients();
    this.fetchCurrentUser();
    this.filteredClients = this.clients;
  }

  fetchAllClients(){
    this.userService.fetchAllClients().subscribe(
      response => {
        this.clients = response;
        this.filteredClients = this.clients;      
      }
    );
  }  

  fetchCurrentUser(){
    this.userService.fetchCurrentUser(sessionStorage.getItem('username')).subscribe(
      response => {
        this.currentUser = response;
        sessionStorage.setItem('userId', response.userId.toString());
        sessionStorage.setItem('entitlementDesc', response.entitlementDesc);
      }
    );
  }

  searchById(id: number){
    if(!id){
      this.filteredClients = this.clients;
    }
    else{
      this.filteredClients = this.clients.filter(client => client.id == id);
      console.log(this.filteredClients);
    }
  }

  searchByName(first: string, last: string){
    if(first.length < 3 || last.length < 3){
      this.filteredClients = this.clients;
    }
    else{
      this.filteredClients = 
      this.clients.filter
      (
        client => client.firstName.toLowerCase().includes(first.toLowerCase()) && 
        client.lastName.toLowerCase().includes(last.toLowerCase())
      );
      console.log(this.filteredClients);
    }
  }

  change(search: string){
    this.searchBy = search;
  }

}
