import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedOutRoutingModule } from './logged-out-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    LoggedOutRoutingModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class LoggedOutModule { }
