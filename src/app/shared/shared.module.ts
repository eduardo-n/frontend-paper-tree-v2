import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { CpfMaskDirective } from './directives/cpf-mask/cpf-mask.directive';
import { ConfirmationModalComponent } from './modais/confirmation-modal/confirmation-modal.component';
import { MaterialModule } from './modules/material/material.module';
import { TokenValidationModalComponent } from './modais/token-validation-modal/token-validation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './components/post-card/post-card.component';
import { EmptyContentCardComponent } from './components/empty-content-card/empty-content-card.component';
import { SimpleLoaderComponent } from './components/simple-loader/simple-loader.component';


@NgModule({
  declarations: [
    ErrorMessagesComponent,
    CpfMaskDirective,
    ConfirmationModalComponent,
    TokenValidationModalComponent,
    PostCardComponent,
    EmptyContentCardComponent,
    SimpleLoaderComponent
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
    PostCardComponent,
    EmptyContentCardComponent,
    SimpleLoaderComponent,
    // directives
    CpfMaskDirective
  ]
})
export class SharedModule { }
