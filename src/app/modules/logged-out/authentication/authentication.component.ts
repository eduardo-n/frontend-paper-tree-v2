import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnauthenticatedComponentsEnum } from 'src/app/core/enum/unauthenticated-components.enum';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  unauthenticatedComponent: UnauthenticatedComponentsEnum;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.unauthenticatedComponent = data['unauthenticatedComponent'];
    })
  }

  get UnauthenticatedComponentsEnum() {
    return UnauthenticatedComponentsEnum;
  }
}
