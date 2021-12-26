import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentListComponent } from './customer-payment-list.component';

describe('CustomerPaymentListComponent', () => {
  let component: CustomerPaymentListComponent;
  let fixture: ComponentFixture<CustomerPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
