import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { CpfMaskDirective } from './directives/cpf-mask/cpf-mask.directive';


@NgModule({
  declarations: [
    ErrorMessagesComponent,
    CpfMaskDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // components
    ErrorMessagesComponent,
    // directives
    CpfMaskDirective
  ]
})
export class SharedModule { }
