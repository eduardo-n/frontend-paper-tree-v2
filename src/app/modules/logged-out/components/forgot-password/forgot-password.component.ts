import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formForgotPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email, PptValidators.emailUfvDomain]],
      novaSenha: [null, [Validators.required, PptValidators.passwordRules]],
      confirmarNovaSenha: [null, [Validators.required, PptValidators.passwordCompare('novaSenha')]]
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
          // Fazer a alteração da senha

        }
      });
    }
  }

  get email() {
    return this.formForgotPassword.get('email');
  }

  get novaSenha() {
    return this.formForgotPassword.get('novaSenha');
  }

  get confirmarNovaSenha() {
    return this.formForgotPassword.get('confirmarNovaSenha');
  }
}
