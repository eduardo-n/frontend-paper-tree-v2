import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkRegisterModalComponent } from '../../modules/home/modais/work-register-modal/work-register-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/modais/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  workRegisterModal() {
    return this.dialog.open(WorkRegisterModalComponent, {
      panelClass: 'custom-modal',
      backdropClass: 'backdrop-background'
    });
  }

  logout() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        cssClassIcon: 'fa-solid fa-triangle-exclamation',
        text: 'Deseja mesmo sair ?',
        primaryButtonText: 'Não',
        secondaryButtonText: 'Sim'
      },
      panelClass: 'custom-modal',
      backdropClass: 'backdrop-background'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.authService.logoutUser();
        this.router.navigateByUrl('/');
        window.location.reload();
      }
    });
  }
}
