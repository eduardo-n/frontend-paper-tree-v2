import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loggedUser: any;

  constructor(
    private httpService: HttpClient
  ) {
    this._loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
  }

  login(loginData): Observable<any> {
    return this.httpService.get(`${environment.baseURL}users/login`,
      {
        params: loginData
      }
    );
  }

  setLoggedUser(loggedUser) {
    sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

  sendTokenEmail(email: string){
    return this.httpService.post(`${environment.baseURL}users/token/email`, email);
  }

  updateUserPassword(email: string, newPassword: string){
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
