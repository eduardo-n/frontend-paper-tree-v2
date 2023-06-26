import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenValidationModalComponent } from './token-validation-modal.component';

describe('TokenValidationModalComponent', () => {
  let component: TokenValidationModalComponent;
  let fixture: ComponentFixture<TokenValidationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenValidationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenValidationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
