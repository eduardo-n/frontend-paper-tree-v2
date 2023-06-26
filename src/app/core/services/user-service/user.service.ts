import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';

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

  searchUsersBySplitNameOrRegister(strName: String): Observable<UserModel[]>{
    return this.httpService.get<UserModel[]>(`${environment.baseURL}users/search/${strName}`);
  }
}
