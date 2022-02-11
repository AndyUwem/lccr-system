import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClothComponent } from './new-cloth.component';

describe('NewClothComponent', () => {
  let component: NewClothComponent;
  let fixture: ComponentFixture<NewClothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
