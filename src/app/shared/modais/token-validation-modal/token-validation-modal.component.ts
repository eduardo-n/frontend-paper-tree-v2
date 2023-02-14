import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastStyleEnum } from 'src/app/core/enum/toastStyle.enum';
import { ModalModel } from 'src/app/core/models/modal.model';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-token-validation-modal',
  templateUrl: './token-validation-modal.component.html',
  styleUrls: ['./token-validation-modal.component.scss']
})
export class TokenValidationModalComponent implements OnInit {

  formToken: FormGroup;
  officialToken: string = 'pegar da API';

  constructor(
    public modalRef: MatDialogRef<TokenValidationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalModel,

    private fb: FormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formToken = this.fb.group({
      tokenControl: [null, [Validators.required]]
    });
  }

  close(): void {
    this.modalRef.close(false);
  }

  onSubmit() {
    if(this.tokenControl.value === this.officialToken) {
      this.modalRef.close(true);
    } else {
      this.toastService.open('Token inválido', ToastStyleEnum.failure);
    }
  }

  get tokenControl() {
    return this.formToken.get('tokenControl');
  }
}