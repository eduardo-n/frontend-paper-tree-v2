import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedOutRoutingModule } from './logged-out-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoggedOutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class LoggedOutModule { }
