import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModel } from 'src/app/core/models/modal.model';

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
      // Exibir Toast de Token Incorreto
    }
  }

  get tokenControl() {
    return this.formToken.get('tokenControl');
  }
}
