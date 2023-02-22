import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FeedComponent } from './feed/feed.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
