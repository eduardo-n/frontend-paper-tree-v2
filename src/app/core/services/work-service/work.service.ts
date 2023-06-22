import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WorkModel } from '../../models/work.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(
    private httpService: HttpClient
  ) { }

  workRegister(work: WorkModel){
    return this.httpService.post(`${environment.baseURL}works/insert`, work);
  }

  sendFile(workFile){
    return this.httpService.post(`${environment.baseURL}works/pdf`, workFile);
  }

  sendImage(workImage){
    return this.httpService.post(`${environment.baseURL}works/image`, workImage);
  }

  listaTccs(): Observable<WorkModel[]>{
    return this.httpService.get<WorkModel[]>(`${environment.baseURL}works`);
  }
}
