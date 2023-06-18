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
      nome: [null, [Validators.required, PptValidators.fullNameSurname]],
      cpf: [null, [Validators.required, PptValidators.cpf]]
    });

    this.formCollege = this.fb.group({
      curso: [{ value: "Sistemas de Informação", disabled: true }, [Validators.required]],
      matricula: [null, [Validators.required, Validators.minLength(4)]],
      tipoContribuidor: [ContributorTypeEnum.AUTHOR],
      tokenOrientador: [null],
      dataIngresso: [null, [Validators.required]]
    });

    this.formAccess = this.fb.group({
      email: [null, [Validators.required, Validators.email, PptValidators.emailUfvDomain]],
      senha: [null, [Validators.required, PptValidators.passwordRules]],
      confirmarSenha: [null, [Validators.required, PptValidators.passwordCompare('senha')]]
    });
  }

  onCheckboxChangeContributorType(event: any) {
    if (event.checked) {
      this.tipoContribuidor.setValue(ContributorTypeEnum.ADVISOR);
      this.tokenOrientador.setValidators([Validators.required]);
    } else {
      this.tipoContribuidor.setValue(ContributorTypeEnum.AUTHOR);
      this.tokenOrientador.setValidators(null);
    }
    this.tokenOrientador.updateValueAndValidity();
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
  get nome() {
    return this.formPersonal.get('nome');
  }
  get cpf() {
    return this.formPersonal.get('cpf');
  }

  //FormCollege
  get curso() {
    return this.formCollege.get('curso');
  }
  get matricula() {
    return this.formCollege.get('matricula');
  }
  get tipoContribuidor() {
    return this.formCollege.get('tipoContribuidor');
  }
  get tokenOrientador() {
    return this.formCollege.get('tokenOrientador');
  }
  get dataIngresso() {
    return this.formCollege.get('dataIngresso');
  }

  //FormLogon
  get email() {
    return this.formAccess.get('email');
  }
  get senha() {
    return this.formAccess.get('senha');
  }
  get confirmarSenha() {
    return this.formAccess.get('confirmarSenha');
  }

  get ContributorTypeEnum() {
    return ContributorTypeEnum;
  }
}
