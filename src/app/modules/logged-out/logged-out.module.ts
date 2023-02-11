import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedOutRoutingModule } from './logged-out-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoggedOutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class LoggedOutModule { }
