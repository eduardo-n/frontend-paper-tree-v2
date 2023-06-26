import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: '[app-simple-loader]',
  templateUrl: './simple-loader.component.html',
  styleUrls: ['./simple-loader.component.scss']
})
export class SimpleLoaderComponent implements OnInit {
  @Input('app-simple-loader') show = true;
  @Input('simple-loader-size') size: 'small' | 'large' | 'medium' = 'medium';
  @Input('simple-loader-bg-color') bgColor: string = 'var(--secondary-color)';

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  get diameter() {
    return this.size === 'small' ? 20 : this.size === 'large' ? 60 : 40;
  }
}
