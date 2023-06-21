import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { LoggedRoutingModule } from './logged-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  declarations: [HeaderBarComponent],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BarRatingModule
  ],
  exports: [RouterModule]
})
export class LoggedModule { }
