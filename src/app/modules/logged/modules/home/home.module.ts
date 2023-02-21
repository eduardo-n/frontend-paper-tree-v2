import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FeedComponent } from './feed/feed.component';
import { EmptyContentCardComponent } from './components/empty-content-card/empty-content-card.component';


@NgModule({
  declarations: [
    FeedComponent,
    EmptyContentCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
