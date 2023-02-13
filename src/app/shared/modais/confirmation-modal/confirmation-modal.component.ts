import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModel } from 'src/app/core/models/modal.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(
    public modalRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalModel
  ) { }

  ngOnInit(): void {
    this.data.primaryButtonText = this.data.primaryButtonText ?? 'Cancelar';
    this.data.secondaryButtonText = this.data.secondaryButtonText ?? 'Confirmar';
  }

  close(): void {
    this.modalRef.close();
  }
}
