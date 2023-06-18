import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: string[] = ['','','','','','','','','','','']

  constructor() { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {

  }
}
