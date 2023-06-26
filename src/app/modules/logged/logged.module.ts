import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { LoggedRoutingModule } from './logged-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkRegisterModalComponent } from './components/work-register-modal/work-register-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileBannerComponent } from './components/profile-banner/profile-banner.component';

@NgModule({
  declarations: [HeaderBarComponent, FeedComponent, ProfileComponent, WorkRegisterModalComponent, ProfileBannerComponent],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BarRatingModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class LoggedModule { }
