import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { LoggedRoutingModule } from './logged-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderBarComponent],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    MaterialModule
  ],
  exports: [RouterModule]
})
export class LoggedModule { }
