import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './modules/home/pages/feed/feed.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    //canActivate: []
  },
  {
    path:'**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
