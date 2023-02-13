import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TipoContribuidorEnum } from 'src/app/core/enum/tipoContribuidor.enum';
import { ConfirmationModalComponent } from 'src/app/shared/modais/confirmation-modal/confirmation-modal.component';
import { PptValidators } from 'src/app/shared/validators/ppt-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formPersonal: FormGroup;
  formCollege: FormGroup;
  formAccess : FormGroup;

  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
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
      tipoContribuidor: [TipoContribuidorEnum.AUTOR],
      tokenOrientador: [null],
      dataIngresso: [null, [Validators.required]]
    });

    this.formAccess = this.fb.group({
      email: [null, [Validators.required, Validators.email, PptValidators.emailUfvDomain]],
      senha: [null, [Validators.required]],
      confirmarSenha: [null, [Validators.required]]
    });
  }

  onCheckboxChangeContributorType(event: any) {
    if (event.checked) {
      this.tipoContribuidor.setValue(TipoContribuidorEnum.ORIENTADOR);
      this.tokenOrientador.setValidators([Validators.required]);
    } else {
      this.tipoContribuidor.setValue(TipoContribuidorEnum.AUTOR);
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
    });
  }

  onSubmit() {

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

  get TipoContribuidorEnum() {
    return TipoContribuidorEnum;
  }
}
