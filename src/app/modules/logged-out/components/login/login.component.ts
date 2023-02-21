import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PptValidators } from 'src/app/shared/validators/ppt-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email, PptValidators.emailUfvDomain]],
      senha: [null, [Validators.required]]
    });
  }

  onSubmit() {

  }

  get email() {
    return this.formLogin.get('email');
  }

  get senha() {
    return this.formLogin.get('senha');
  }
}
