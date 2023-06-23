import { Component, OnInit } from '@angular/core';
import { ContributorTypeEnum } from 'src/app/core/enum/contributor-type.enum';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss']
})
export class ProfileBannerComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  get ContributorTypeEnum() {
    return ContributorTypeEnum;
  }

  get loggedUser() {
    return this.authService.loggedUser;
  }
}
