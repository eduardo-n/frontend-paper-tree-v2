import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

@Component({
  standalone: true,
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
