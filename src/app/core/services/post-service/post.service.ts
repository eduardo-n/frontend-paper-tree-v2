import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpService: HttpClient
  ) { }

  listaPostagens(): Observable<PostModel[]>{
    return this.httpService.get<PostModel[]>(`${environment.baseURL}post`);
  }
}
