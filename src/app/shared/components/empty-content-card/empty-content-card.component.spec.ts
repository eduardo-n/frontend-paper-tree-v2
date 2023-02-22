import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyContentCardComponent } from './empty-content-card.component';

describe('EmptyContentCardComponent', () => {
  let component: EmptyContentCardComponent;
  let fixture: ComponentFixture<EmptyContentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyContentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
