import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedRoutingModule } from './logged-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: HeaderBarComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        //canActivate: []
      },
      {
        path:'**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  declarations: [HeaderBarComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [RouterModule]
})
export class LoggedModule { }
