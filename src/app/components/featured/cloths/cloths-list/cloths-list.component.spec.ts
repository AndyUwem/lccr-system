import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothsListComponent } from './cloths-list.component';

describe('ClothsListComponent', () => {
  let component: ClothsListComponent;
  let fixture: ComponentFixture<ClothsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
