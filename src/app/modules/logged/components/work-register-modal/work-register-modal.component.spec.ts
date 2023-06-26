import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRegisterModalComponent } from './work-register-modal.component';

describe('WorkRegisterModalComponent', () => {
  let component: WorkRegisterModalComponent;
  let fixture: ComponentFixture<WorkRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRegisterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
