import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantLoginComponent } from './attendant-login.component';

describe('AttendantLoginComponent', () => {
  let component: AttendantLoginComponent;
  let fixture: ComponentFixture<AttendantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendantLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
