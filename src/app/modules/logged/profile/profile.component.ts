import { Component, OnInit } from '@angular/core';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { PostModel } from 'src/app/core/models/post.model';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PostService } from 'src/app/core/services/post-service/post.service';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  listOfContributedPosts: PostModel[] = [];
  listOfSavedPosts: PostModel[] = [];

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getListOfContributedPosts();
    this.getListOfSavedPosts();
  }

  getListOfContributedPosts() {
    this.postService.listPostsByUserId(this.authService.loggedUser.id)
      .pipe()
      .subscribe({
        next: (data) => {
          this.listOfContributedPosts = data;
        },
        error: (e) => {
          this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
        }
      });
  }

  getListOfSavedPosts() {
    this.postService.listSavedPostsByUserId(this.authService.loggedUser.id)
      .pipe()
      .subscribe((data) => {
        this.listOfSavedPosts = data;
      })
  }
}
