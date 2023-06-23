import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: PostModel;

  constructor() { }

  ngOnInit(): void {
  }

  getFirstLetterContributorName(contributorName: string) {
    return contributorName.substring(0, 1);
  }

  getConcatenatedNames(){
    let tamArrayContribuidores = this.post.work.contributors.length;
    let concatenatedNames = '';

    this.post.work.contributors.forEach((contributor, index) => {
      if(tamArrayContribuidores-1 === index){
        concatenatedNames = `${concatenatedNames}${contributor.name}.`;
      } else if(tamArrayContribuidores > 1 && index === tamArrayContribuidores-2){
        concatenatedNames = `${concatenatedNames}${contributor.name} e `;
      } else {
        concatenatedNames = `${concatenatedNames}${contributor.name}, `;
      }
    });

    return concatenatedNames;
  }

  get getImageScr() {
    return `../../../../../assets/imagem-trabalho/${this.post.work.id}.png`;
  }
}
