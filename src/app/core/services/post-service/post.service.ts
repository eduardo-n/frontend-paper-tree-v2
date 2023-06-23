import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LikeOrSaveRequestModel } from '../../models/like-or-save-request.model';

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

  insertLike(like: LikeOrSaveRequestModel){
    return this.httpService.post(`${environment.baseURL}like/insert`, like);
  }

  removeLike(likeId: number){
    return this.httpService.delete(`${environment.baseURL}like/delete/${likeId}`);
  }

  saveWork(save: LikeOrSaveRequestModel){
    return this.httpService.post(`${environment.baseURL}saved/work/insert`, save);
  }

  removeSave(saveId: number){
    return this.httpService.delete(`${environment.baseURL}saved/work/delete/${saveId}`);
  }
}
