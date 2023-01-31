import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'',
  //   loadChildren: () => import('./modules/logged/logged.module').then(m => m.LoggedModule),
  //   //canActivate: []
  // },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/logged-out/logged-out.module').then(m => m.LoggedOutModule),
    //canActivate: []
  },
  {
    path:'**',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
