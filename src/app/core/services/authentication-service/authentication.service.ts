import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';
import { ContributorTypeEnum } from '../../enum/contributor-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loggedUser: UserModel;
  teste = 0;
  teste2 = 'ADVISOR'

  constructor(
    private httpService: HttpClient
  ) {
    this._loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this._loggedUser ?
      (this._loggedUser.contributorType = this._loggedUser.contributorType === 0 ? ContributorTypeEnum.AUTHOR : ContributorTypeEnum.ADVISOR)
      : null;
  }

  login(loginData): Observable<any> {
    return this.httpService.get(`${environment.baseURL}users/login`,
      {
        params: loginData
      }
    );
  }

  loginUser(loggedUser) {
    loggedUser.contributorType = loggedUser.contributorType === "AUTHOR" ? 0 : 1;
    sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

  logoutUser() {
    sessionStorage.removeItem('loggedUser');
  }

  sendTokenEmail(email: string) {
    return this.httpService.post(`${environment.baseURL}users/token/email`, email);
  }

  updateUserPassword(email: string, newPassword: string) {
    return this.httpService.post(`${environment.baseURL}users/update/password`,
      {
        email: email,
        password: newPassword
      },
      {
        responseType: 'arraybuffer'
      }
    );
  }

  get loggedUser() {
    return this._loggedUser;
  }
}
