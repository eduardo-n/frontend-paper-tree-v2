import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkRegisterModalComponent } from '../../modules/home/modais/work-register-modal/work-register-modal.component';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  workRegisterModal() {
    return this.dialog.open(WorkRegisterModalComponent, {
      panelClass: 'custom-modal',
      backdropClass: 'backdrop-background'
    });
  }
}
