import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/models/user.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { WorkService } from 'src/app/core/services/work-service/work.service';

@Component({
  selector: 'app-work-register-modal',
  templateUrl: './work-register-modal.component.html',
  styleUrls: ['./work-register-modal.component.scss']
})
export class WorkRegisterModalComponent implements OnInit {

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  formWorkRegister: UntypedFormGroup;
  showSelectedUsers: string[] = [];
  selectedUsers: UserModel[] = [];
  usersFound: UserModel[] = [];
  authorData = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  workFile: File = null;
  formDataPdf = new FormData();
  workImage: File = null;
  formDataImage = new FormData();
  workRating = 3;
  loaderRegister: boolean = false;

  constructor(
    public modalRef: MatDialogRef<WorkRegisterModalComponent>,
    private fb: UntypedFormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private authService: AuthenticationService,
    private workService: WorkService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.authorData.valueChanges.subscribe(() => {
      if (!this.authorData.value) {
        this.usersFound = [];
      }

      if (typeof (this.authorData.value) != 'object') {
        this.userService.searchUsersBySplitNameOrRegister(this.authorData.value)
          .pipe(
            finalize(() => { })
          )
          .subscribe((data) => {
            this.usersFound = data;
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
    debugger
    if (this.formWorkRegister.valid && this.workFile && this.workImage) {
      this.formFilling();
      debugger
      if (this.contributors.value.length > 1) {
        this.loaderRegister = true;
        setTimeout(() => {
          this.registerTcc();
        }, 1200);
      } else {
        this.toastService.open('Adicione os autores', ToastStyleEnum.failure);
      }
    } else if (!this.workFile) {
      this.toastService.open('Adicione o PDF do trabalho', ToastStyleEnum.failure);
    } else if (!this.workImage) {
      this.toastService.open('Adicione uma imagem ao trabalho', ToastStyleEnum.failure);
    }
  }

  registerTcc() {
    this.workService.workRegister(this.formWorkRegister.value)
      .pipe(finalize(() => {this.loaderRegister = false;}))
      .subscribe({
        next: () => {
          this.saveWorkFile();
          this.saveWorkImage();
          this.toastService.open('Trabalho cadastrado com sucesso', ToastStyleEnum.success);
          this.modalRef.close();
        },
        error: (e) => {
          this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
        }
      });
  }

  saveWorkFile() {
    this.workService.sendFile(this.formDataPdf)
      .subscribe({
        next: () => {
          this.toastService.open('Trabalho inserido com sucesso', ToastStyleEnum.success);
          this.workFile = null;
        },
        error: (e) => {
          this.toastService.open('Algo deu errado ao inserir o PDF', ToastStyleEnum.failure);
        }
      });
  }

  saveWorkImage() {
    this.workService.sendImage(this.formDataImage)
    .subscribe({
      next: () => {
        this.workImage = null;
      },
      error: (e) => {
        this.toastService.open('Algo deu errado ao inserir a imagem', ToastStyleEnum.failure);
      }
    });
  }

  formFilling() {
    this.selectedUsers.push(this.authService.loggedUser);
    this.contributors.setValue(this.selectedUsers);
    this.rating.setValue(this.workRating);
    this.creationDate.setValue(new Date());
  }

  removeContribuidor(user: string): void {
    const index = this.showSelectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
      this.showSelectedUsers.splice(index, 1);
    }
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (this.validarArquivoPdf(event.target.files[0])) {
        this.workFile = event.target.files[0];
        this.formDataPdf.append('file', this.workFile);

        document.getElementById('inputFile').setAttribute("data-text", this.workFile.name.substring(0, 22));
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
        this.workImage = event.target.files[0];
        this.formDataImage.append('file', this.workImage);

        document.getElementById('inputFileImage').setAttribute("data-text", this.workImage.name.substring(0, 22));
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
    if(!this.selectedUsers.find(u => u.id === event.option.value.id)) {
      this.selectedUsers.push(event.option.value);
      this.showSelectedUsers.push(event.option.viewValue);
    }
    this.userInput.nativeElement.value = '';
    this.authorData.setValue(null);
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
