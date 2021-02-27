import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { AdminGuard, AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userHome', component: UserHomeComponent, canActivate: [AuthGuard] },
  {path: 'createClient', component: CreateClientComponent, canActivate: [AuthGuard]},
  { path: 'adminHome', component: AdminHomeComponent, canActivate: [AdminGuard] },  
  { path: 'editUser/:id/:first/:last/:dob/:phonenumber/:branch/:status/:entitlement', component: EditUserComponent, canActivate: [AdminGuard]},
  { path: 'createUser', component: CreateUserComponent, canActivate: [AdminGuard]},    
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
