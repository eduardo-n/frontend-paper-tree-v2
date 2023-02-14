import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ToastStyleEnum } from '../../enum/toastStyle.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  open(message: string, style: ToastStyleEnum) {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: style === ToastStyleEnum.alert ? 'alert-snack-bar' : style === ToastStyleEnum.success ? 'success-snack-bar' : 'failure-snack-bar'
    });
  }
}
