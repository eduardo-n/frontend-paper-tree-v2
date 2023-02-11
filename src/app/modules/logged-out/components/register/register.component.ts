import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoContribuidorEnum } from 'src/app/core/enum/tipoContribuidor.enum';
import { pptValidators } from 'src/app/shared/validators/ppt-validators';

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
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formPersonal = this.fb.group({
      nome: [null, [Validators.required, pptValidators.fullNameSurname]],
      cpf: [null, [Validators.required, pptValidators.cpf]]
    });

    this.formCollege = this.fb.group({
      curso: [{ value: "Sistemas de Informação", disabled: true }, [Validators.required]],
      matricula: [null, [Validators.required, Validators.minLength(4)]],
      tipoContribuidor: [TipoContribuidorEnum.AUTOR],
      tokenOrientador: [null],
      dataIngresso: [null, [Validators.required]]
    })
    this.curso.disable();

    this.formAccess = this.fb.group({
      email: [null, [Validators.required, Validators.email/*, pptValidators.emailUfvDomain*/]],
      senha: [null, [Validators.required]],
      confirmarSenha: [null, [Validators.required]]
    })
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
