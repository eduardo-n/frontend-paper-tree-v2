import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ContributorTypeEnum } from 'src/app/core/enum/contributor-type.enum';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { ConfirmationModalComponent } from 'src/app/shared/modais/confirmation-modal/confirmation-modal.component';
import { TokenValidationModalComponent } from 'src/app/shared/modais/token-validation-modal/token-validation-modal.component';
import { PptValidators } from 'src/app/shared/validators/ppt-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formPersonal: UntypedFormGroup;
  formCollege: UntypedFormGroup;
  formAccess: UntypedFormGroup;

  hidePassword: boolean = true;
  registerLoader: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formPersonal = this.fb.group({
      name: [null, [Validators.required, PptValidators.fullNameSurname]],
      cpf: [null, [Validators.required, PptValidators.cpf]]
    });

    this.formCollege = this.fb.group({
      course: [{ value: "Sistemas de Informação", disabled: true }, [Validators.required]],
      register: [null, [Validators.required, Validators.minLength(4)]],
      contributorType: [ContributorTypeEnum.AUTHOR],
      validateTokenAdvisor: [null],
      admissionDate: [null, [Validators.required]]
    });

    this.formAccess = this.fb.group({
      email: [null, [Validators.required, Validators.email, PptValidators.emailUfvDomain]],
      password: [null, [Validators.required, PptValidators.passwordRules]],
      confirmationPassword: [null, [Validators.required, PptValidators.passwordCompare('password')]]
    });
  }

  onCheckboxChangeContributorType(event: any) {
    if (event.checked) {
      this.contributorType.setValue(ContributorTypeEnum.ADVISOR);
      this.validateTokenAdvisor.setValidators([Validators.required]);
    } else {
      this.contributorType.setValue(ContributorTypeEnum.AUTHOR);
      this.validateTokenAdvisor.setValidators(null);
    }
    this.validateTokenAdvisor.updateValueAndValidity();
  }

  confirmationModal() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        cssClassIcon: 'fa-solid fa-triangle-exclamation',
        text: 'Deseja mesmo cancelar o seu cadastro ?',
        primaryButtonText: 'Continuar editando',
        secondaryButtonText: 'Sim, quero cancelar'
      },
      panelClass: 'custom-modal',
      backdropClass: 'backdrop-background'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.router.navigateByUrl('/autenticacao');
      }
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

  concatenateForms() {
    return {
      ...this.formPersonal.value,
      ...this.formCollege.value,
      ...this.formAccess.value,
    }
  }

  onSubmit() {
    if (this.formPersonal.valid && this.formCollege.valid && this.formAccess.valid) {
      this.tokenValidationModal().afterClosed().subscribe(confirmedValidation => {
        if (confirmedValidation) {
          this.registerLoader = true;
          this.userService.registerUser(this.concatenateForms())
            .pipe(
              finalize(() => this.registerLoader = false)
            ).subscribe({
              next: () => {
                this.toastService.open('Cadastrado com sucesso', ToastStyleEnum.success);
                this.router.navigateByUrl('/');
              },
              error: (e) => {
                this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
              }
            });
        }
      });
    }
  }

  //FormPersonal
  get name() {
    return this.formPersonal.get('name');
  }
  get cpf() {
    return this.formPersonal.get('cpf');
  }

  //FormCollege
  get course() {
    return this.formCollege.get('course');
  }
  get register() {
    return this.formCollege.get('register');
  }
  get contributorType() {
    return this.formCollege.get('contributorType');
  }
  get validateTokenAdvisor() {
    return this.formCollege.get('validateTokenAdvisor');
  }
  get admissionDate() {
    return this.formCollege.get('admissionDate');
  }

  //FormLogon
  get email() {
    return this.formAccess.get('email');
  }
  get password() {
    return this.formAccess.get('password');
  }
  get confirmationPassword() {
    return this.formAccess.get('confirmationPassword');
  }

  get ContributorTypeEnum() {
    return ContributorTypeEnum;
  }
}
