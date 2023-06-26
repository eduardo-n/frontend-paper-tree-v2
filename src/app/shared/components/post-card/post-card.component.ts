import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastStyleEnum } from 'src/app/core/enum/toast-style.enum';
import { LikeModel } from 'src/app/core/models/like.model';
import { PostModel } from 'src/app/core/models/post.model';
import { SaveModel } from 'src/app/core/models/save.model';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { PostService } from 'src/app/core/services/post-service/post.service';
import { ToastService } from 'src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: PostModel;
  @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();

  likePost: LikeModel;
  savePost: SaveModel;

  constructor(
    private authService: AuthenticationService,
    private postService: PostService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.setLikePost();
    this.setSavePost();
  }

  setLikePost() {
    this.likePost = this.post.likes.find(like => like.author.id === this.authService.loggedUser.id);
  }

  setSavePost() {
    this.savePost = this.post.savedWorks.find(save => save.author.id === this.authService.loggedUser.id);
  }

  getFirstLetterContributorName(contributorName: string) {
    return contributorName.substring(0, 1);
  }

  getConcatenatedNames() {
    let tamArrayContribuidores = this.post.work.contributors.length;
    let concatenatedNames = '';

    this.post.work.contributors.forEach((contributor, index) => {
      if (tamArrayContribuidores - 1 === index) {
        concatenatedNames = `${concatenatedNames}${contributor.name}.`;
      } else if (tamArrayContribuidores > 1 && index === tamArrayContribuidores - 2) {
        concatenatedNames = `${concatenatedNames}${contributor.name} e `;
      } else {
        concatenatedNames = `${concatenatedNames}${contributor.name}, `;
      }
    });

    return concatenatedNames;
  }

  downloadWorkFile() {
    const a = document.createElement('a');
    a.href = `assets/trabalhos-inseridos/${this.post.work.id}.pdf`;
    a.download = `${this.post.work.title}.pdf`;
    a.click();
  }

  interactionLike() {
    if (this.likePost) {
      this.postService.removeLike(this.likePost.id)
        .pipe()
        .subscribe({
          next: () => {
            this.post.likes.splice(this.post.likes.findIndex(like => like.id === this.likePost.id), 1);
            this.likePost = null;
          },
          error: (e) => {
            this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
          }
        });
    } else {
      this.postService.insertLike({ author: this.authService.loggedUser, post: this.post })
        .pipe()
        .subscribe({
          next: (data: LikeModel) => {
            this.post.likes.push(data);
            this.likePost = data;
          },
          error: (e) => {
            this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
          }
        });
    }
  }

  interactionSave() {
    if(this.savePost){
      this.postService.removeSave(this.savePost.id)
      .pipe()
      .subscribe({
        next: () => {
          this.savePost = null;
          this.saveEvent.emit();
        },
        error: (e) => {
          this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
        }
      });
    }else{
      this.postService.saveWork({ author: this.authService.loggedUser, post: this.post })
      .pipe()
      .subscribe({
        next: (data: SaveModel) => {
          this.savePost = data;
          this.saveEvent.emit();
        },
        error: (e) => {
          this.toastService.open('Algo deu errado', ToastStyleEnum.failure);
        }
      });
    }
  }

  get getImageScr() {
    return `../../../../../assets/imagem-trabalho/${this.post.work.id}.png`;
  }

  get getWasLiked() {
    return this.likePost;
  }

  get getWasSaved() {
    return this.savePost;
  }
}
