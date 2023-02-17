import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/logged/logged.module').then(m => m.LoggedModule),
    //canActivate: []
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./modules/logged-out/logged-out.module').then(m => m.LoggedOutModule),
    //canActivate: []
  },
  {
    path:'**',
    redirectTo: ''
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
