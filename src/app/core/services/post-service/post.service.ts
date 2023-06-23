import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LikeModel } from '../../models/like.model';
import { LikeRequestModel } from '../../models/like-request.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpService: HttpClient
  ) { }

  listPosts(): Observable<PostModel[]>{
    return this.httpService.get<PostModel[]>(`${environment.baseURL}post`);
  }

  insertLike(like: LikeRequestModel){
    return this.httpService.post(`${environment.baseURL}like/insert`, like);
  }

  removeLike(likeId: number){
    return this.httpService.delete(`${environment.baseURL}like/delete/${likeId}`);
  }
}
