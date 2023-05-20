import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastStyleEnum } from 'src/app/core/enum/toastStyle.enum';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';
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
    private fb: UntypedFormBuilder,
    private authService: AuthenticationService,
    private toastService: ToastService
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
    if(this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        {
          next: (data) => {
            data // setar na session storage
          },
          error: (e) => {
            this.toastService.open('Usuário inválido', ToastStyleEnum.failure);
          }
        }
      )
    }
  }

  get email() {
    return this.formLogin.get('email');
  }

  get senha() {
    return this.formLogin.get('senha');
  }
}
