import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedComponentsEnum } from 'src/app/core/enum/unauthenticated-components.enum';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    data: { unauthenticatedComponent: UnauthenticatedComponentsEnum.login }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoggedOutRoutingModule { }
