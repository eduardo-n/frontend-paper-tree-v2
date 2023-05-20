import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loggedUser: any;

  constructor() {
    this._loggedUser = sessionStorage.getItem('loggedUser');
  }

  get loggedUser() {
    return this._loggedUser;
  }
}
