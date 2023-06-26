import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { ModalTokenValidationModel } from 'src/app/core/models/modal-token-validation.model';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-token-validation-modal',
  templateUrl: './token-validation-modal.component.html',
  styleUrls: ['./token-validation-modal.component.scss']
})
export class TokenValidationModalComponent implements OnInit {

  formToken: UntypedFormGroup;
  officialToken: string;
  fakeLoader: boolean;

  constructor(
    public modalRef: MatDialogRef<TokenValidationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalTokenValidationModel,

    private fb: UntypedFormBuilder,
    private toastService: ToastService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getOfficialToken();
  }

  buildForm() {
    this.formToken = this.fb.group({
      tokenControl: [null, [Validators.required]]
    });
  }

  getOfficialToken() {
    this.officialToken = null;
    this.authService.sendTokenEmail(this.data.email).subscribe(data => {
      this.officialToken = data.toString();
    });
    return this.officialToken;
  }

  close(resp: boolean = false): void {
    this.modalRef.close(resp);
  }

  onSubmit() {
    if(this.officialToken && this.tokenControl.value === this.officialToken) {
      this.toastService.open('Código válido', ToastStyleEnum.success);
      this.fakeLoader = true;
      setTimeout(() => {
        this.close(true);
      }, 1200);
    } else {
      this.toastService.open('Código inválido', ToastStyleEnum.failure);
    }
  }

  get tokenControl() {
    return this.formToken.get('tokenControl');
  }
}
