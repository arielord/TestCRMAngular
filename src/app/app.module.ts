import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { AdminGuard, AuthGuard } from './services/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateLoginComponent } from './create-login/create-login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminNavComponent,
    CreateClientComponent,
    CreateLoginComponent,
    CreateUserComponent,
    EditUserComponent,
    LoginComponent,
    LoginNavComponent,
    RegisterComponent,
    UserHomeComponent,
    UserNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdminService, UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
