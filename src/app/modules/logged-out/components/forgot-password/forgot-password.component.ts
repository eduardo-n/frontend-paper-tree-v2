import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';
import { TokenValidationModalComponent } from 'src/app/shared/modais/token-validation-modal/token-validation-modal.component';
import { PptValidators } from 'src/app/shared/validators/ppt-validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formForgotPassword: UntypedFormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formForgotPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email, PptValidators.emailUfvDomain]],
      newPassword: [null, [Validators.required, PptValidators.passwordRules]],
      confirmNewPassword: [null, [Validators.required, PptValidators.passwordCompare('newPassword')]]
    });
  }

  tokenValidationModal() {
    return this.dialog.open(TokenValidationModalComponent, {
      data: {
        email: this.email.value
      },
      panelClass: 'custom-modal',
      backdropClass: 'backdrop-background'
    });
  }

  onSubmit() {
    if (this.formForgotPassword.valid) {
      this.tokenValidationModal().afterClosed().subscribe(confirmedValidation => {
        if (confirmedValidation) {
          this.updatePassword();
        }
      });
    }
  }

  updatePassword() {
    this.authService.updateUserPassword(this.email.value, this.newPassword.value)
      .subscribe({
        next: () => {
          this.toastService.open('Senha alterada com sucesso', ToastStyleEnum.success);
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
        }
      });
  }

  get email() {
    return this.formForgotPassword.get('email');
  }

  get newPassword() {
    return this.formForgotPassword.get('newPassword');
  }

  get confirmNewPassword() {
    return this.formForgotPassword.get('confirmNewPassword');
  }
}
