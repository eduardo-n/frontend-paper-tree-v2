import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { CpfMaskDirective } from './directives/cpf-mask/cpf-mask.directive';
import { ConfirmationModalComponent } from './modais/confirmation-modal/confirmation-modal.component';
import { MaterialModule } from './modules/material/material.module';


@NgModule({
  declarations: [
    ErrorMessagesComponent,
    CpfMaskDirective,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    // components
    ErrorMessagesComponent,
    // directives
    CpfMaskDirective
  ]
})
export class SharedModule { }
