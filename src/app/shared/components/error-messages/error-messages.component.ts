import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: '[error-messages]',
  template: `<div class="error-message"><span *ngIf="showErrors">{{firstError}}</span></div>`,
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {

  @Input() control: AbstractControlDirective | AbstractControl;
  @Input() message?: String;
  @Input() touchedValidation = false;

  get showErrors(): boolean {
    if(this.touchedValidation) {
      return this.control.touched;
    }
    return true;
  }

  private readonly errorMessages = {
    required: () => 'Campo obrigatório',
    email: () => this.message ? this.message : 'Email inválido',
    minLength: () => this.message ? this.message : 'Quantidade de dígitos inválida',
    default: (type, params) => {
      console.log('unmaped message throws: ', type, params);
      return this.message ? this.message : (params.message || 'Conteúdo inválido');
    }
  }

  constructor() { }

  get firstError() {
    this.message;
    this.control;
    return this.listOfErrors()[0];
  }

  private getMessage(type: string, params: any) {
    const r = this.errorMessages[type] ? this.errorMessages[type](params) : this.errorMessages.default(type, params);
    return r;
  }

  listOfErrors(): string[] {
    const arr = (this.control && this.control.errors) ?
      Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field])) :
      [];
    return arr;
  }


}
