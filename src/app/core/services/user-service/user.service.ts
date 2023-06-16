import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClient
  ) { }

  registerUser(user){
    return this.httpService.post(`${environment.baseURL}users/insert`, user);
  }
}
