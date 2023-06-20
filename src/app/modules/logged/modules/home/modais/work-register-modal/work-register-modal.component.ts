import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/models/user.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-work-register-modal',
  templateUrl: './work-register-modal.component.html',
  styleUrls: ['./work-register-modal.component.scss']
})
export class WorkRegisterModalComponent implements OnInit {

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  formWorkRegister: UntypedFormGroup;
  exibirUsuariosSelecionados: string[] = [];
  usuariosSelecionados: UserModel[] = [];
  usuariosEncontrados: UserModel[] = [];
  dadoAutor = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fileTcc: File = null;
  formDataPdf = new FormData();

  imagemTcc: File = null;
  formDataImagem = new FormData();
  avaliacaoTcc = 3;

  constructor(
    public modalRef: MatDialogRef<WorkRegisterModalComponent>,
    private fb: UntypedFormBuilder,
    private toastService: ToastService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.dadoAutor.valueChanges.subscribe(() => {
      if (!this.dadoAutor.value) {
        this.usuariosEncontrados = [];
      }

      if (typeof (this.dadoAutor.value) != 'object') {
        this.userService.searchUsersBySplitNameOrRegister(this.dadoAutor.value)
          .pipe(
            finalize(() => { })
          )
          .subscribe((data) => {
            this.usuariosEncontrados = data;
          })
      }
    });
  }

  buildForm() {
    this.formWorkRegister = this.fb.group({
      title: [null, [Validators.required]],
      area: [null, [Validators.required]],
      description: [null, [Validators.required]],
      file: [null, []],
      contributors: [null, []],
      rating: [null, []],
      creationDate: [null, []],
    });
  }

  onSubmit() {

  }

  removeContribuidor(user: string): void {
    const index = this.exibirUsuariosSelecionados.indexOf(user);

    if (index >= 0) {
      this.usuariosSelecionados.splice(index, 1);
      this.exibirUsuariosSelecionados.splice(index, 1);
    }
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (this.validarArquivoPdf(event.target.files[0])) {
        this.fileTcc = event.target.files[0];
        this.formDataPdf.append('file', this.fileTcc);

        document.getElementById('inputFile').setAttribute("data-text", this.fileTcc.name.substring(0, 22));
      } else {
        this.toastService.open('O arquivo deve ser do tipo PDF', ToastStyleEnum.failure);
      }
    }
  }

  validarArquivoPdf(arquivo): boolean {
    if (arquivo.name.split('.').pop() === 'pdf') {
      return true;
    }
    return false;
  }

  inputFileImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (this.validarArquivoPngJpeg(event.target.files[0])) {
        this.imagemTcc = event.target.files[0];
        this.formDataImagem.append('file', this.imagemTcc);

        document.getElementById('inputFileImage').setAttribute("data-text", this.imagemTcc.name.substring(0, 22));
      } else {
        this.toastService.open('O arquivo deve ser do tipo PNG ou JPEG', ToastStyleEnum.failure);
      }
    }
  }

  validarArquivoPngJpeg(arquivo): boolean {
    if (arquivo.name.split('.').pop() === 'png' || arquivo.name.split('.').pop() === 'jpeg') {
      return true;
    }
    return false;
  }

  selectedContribuidor(event: MatAutocompleteSelectedEvent): void {
    this.usuariosSelecionados.push(event.option.value);
    this.exibirUsuariosSelecionados.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.dadoAutor.setValue(null);
  }

  get title() {
    return this.formWorkRegister.get('title');
  }

  get area() {
    return this.formWorkRegister.get('area');
  }

  get description() {
    return this.formWorkRegister.get('description');
  }

  get file() {
    return this.formWorkRegister.get('file');
  }

  get contributors() {
    return this.formWorkRegister.get('contributors');
  }

  get rating() {
    return this.formWorkRegister.get('rating');
  }

  get creationDate() {
    return this.formWorkRegister.get('creationDate');
  }
}
