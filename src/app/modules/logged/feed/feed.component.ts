import { Component, OnInit } from '@angular/core';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { PostModel } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post-service/post.service';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: PostModel[] = [];

  constructor(
    private postService: PostService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.listPosts()
    .subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (e) => {
        this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
      }
    });
  }
}
