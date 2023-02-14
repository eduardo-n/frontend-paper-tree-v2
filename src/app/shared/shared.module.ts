import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { CpfMaskDirective } from './directives/cpf-mask/cpf-mask.directive';
import { ConfirmationModalComponent } from './modais/confirmation-modal/confirmation-modal.component';
import { MaterialModule } from './modules/material/material.module';
import { TokenValidationModalComponent } from './modais/token-validation-modal/token-validation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ErrorMessagesComponent,
    CpfMaskDirective,
    ConfirmationModalComponent,
    TokenValidationModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // components
    ErrorMessagesComponent,
    // directives
    CpfMaskDirective
  ]
})
export class SharedModule { }
