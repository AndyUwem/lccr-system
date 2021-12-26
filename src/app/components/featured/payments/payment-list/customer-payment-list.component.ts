import { Component, OnDestroy, OnInit } from '@angular/core';
import { Payment } from 'src/app/interface/payment.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { PaymentHelperService } from 'src/app/service/payments/paymentsHelper.service';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'customer-payment-list',
  templateUrl: './customer-payment-list.component.html',
  styleUrls: ['./customer-payment-list.component.css']
})
export class CustomerPaymentListComponent implements OnInit, OnDestroy {

  private customerSubscription: Subscription = new Subscription()
  public customer: any;
  public isLoading: boolean = true
  public isCustomerOwing: boolean = false
  public canMakePayment: boolean = false
  public newPayment!: Payment;

  // public newPayment: Payment = {
  //   amountPaid: 0,
  //   balanceOfPayment: 0,
  //   date: new Date().toUTCString(),
  //   totalPayment: 0
  // }

  // public paymentError: PaymentError = {
  //   isAmountExceed: false,
  //   errorMassage: ''
  // };

  constructor(private paymentHelperService: PaymentHelperService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.refreshPaymentsList()
    this.getCustomer()
  }

  private getCustomer(): void {
    this.customerSubscription = this.customerService
      .getCustomerRef()
      .subscribe((customer: Customer) => this.customer = customer)
  }

  private refreshPaymentsList(): void {
    setTimeout(() => {
      this.isLoading = false
      this.handleCustomerDebts(this.customer)
    }, 3000)
  }


  private handleCustomerDebts(customer: Customer): void {
    customer.payments.filter((payment: Payment) => payment.balanceOfPayment > 0 ?
      this.isCustomerOwing = true : this.isCustomerOwing = false)
  }

  setPayment(payment: Payment): void {
     this.newPayment = {...payment}
  }

  updatePayment(): void {
    if (this.newPayment.amountPaid > 0 ) {
      this.customer.payments.push(this.paymentHelperService.createNewPayment(this.newPayment))
      this.paymentHelperService.updatePayments(this.customer.id, this.customer.payments)
     }
     this.recheckCustomerDebts()
     this.refreshPaymentsList()
  }

  private recheckCustomerDebts(): void {
    if(!this.isCustomerOwing)
    this.customer.payments.filter((payment: Payment) => payment.balanceOfPayment > 0 ?
    this.canMakePayment = true : this.canMakePayment = false )
  }

  continueToPaymentsList(): void {
    this.isCustomerOwing = false
    this.canMakePayment = true
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe()
  }


}
