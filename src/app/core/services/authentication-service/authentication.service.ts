import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loggedUser: any;

  constructor(
    private httpService: HttpClient
  ) {
    this._loggedUser = sessionStorage.getItem('loggedUser');
  }

  login(loginData) {
    return this.httpService.get(`${environment.baseURL}users/login`,
      {
        params: loginData
      }
    );
  }

  setLoggedUser(loggedUser) {
    sessionStorage.setItem('loggedUser', loggedUser);
  }

  get loggedUser() {
    return this._loggedUser;
  }
}
