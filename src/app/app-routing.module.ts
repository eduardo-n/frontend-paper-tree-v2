import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guards/logged.guard';
import { LoggedOutGuard } from './core/guards/logged-out.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    loadChildren: () => import('./modules/logged/logged.module').then(m => m.LoggedModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./modules/logged-out/logged-out.module').then(m => m.LoggedOutModule),
    canActivate: [LoggedOutGuard]
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
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
