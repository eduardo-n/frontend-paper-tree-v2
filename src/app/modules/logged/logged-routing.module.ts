import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
