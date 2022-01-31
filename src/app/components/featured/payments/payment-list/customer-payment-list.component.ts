import { Component, OnDestroy, OnInit } from '@angular/core';
import { Payment } from 'src/app/interface/payment.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { PaymentHelperService } from 'src/app/service/payments/paymentsHelper.service';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { SubscriptionService } from 'src/app/service/subscription/subscription.service';
import { AuthService } from '../../accounts/authentication/auth.service';
import { Attendant } from 'src/app/interface/attendant.interface';


@Component({
  selector: 'customer-payment-list',
  templateUrl: './customer-payment-list.component.html',
  styleUrls: ['./customer-payment-list.component.css']
})
export class CustomerPaymentListComponent implements OnInit, OnDestroy {

  public customer!: any;
  public isLoading: boolean = true
  public isCustomerOwing: boolean = false
  public canMakePayment: boolean = false
  public isAdmin: boolean = false


  public newPayment: Payment = {
    amountPaid: 0,
    balanceOfPayment: 0,
    date: new Date().toUTCString(),
    totalPayment: 0
  }


  constructor(private paymentHelperService: PaymentHelperService,
    private customerService: CustomerService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getCustomer()
    this.refreshPaymentsList()  
    this.isAdmin = this.getUserRole()
  }

  private getCustomer(): void {
    this.subscriptionService.add = this.customerService
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
    customer.payments.filter((payment: Payment) => {
      payment.balanceOfPayment > 0 ? this.isCustomerOwing = true : this.isCustomerOwing = false
    })
  }

  public setPayment(payment: Payment): void {
    this.newPayment = { ...payment }
  }

  get onAmountPaidValueCheck(): boolean {
    return this.newPayment.amountPaid > 0;
  }


  public updatePayment(): void {
    if (this.onAmountPaidValueCheck) {
     
      this.customer.payments.push(this.newPayment)
      this.paymentHelperService
      .updatePayments(this.authService.getAdminId, this.customer.id, this.customer.payments)
    }
    this.recheckCustomerDebts()
  }

  private recheckCustomerDebts(): void {
    if (!this.isCustomerOwing)
      this.customer
        .payments
        .filter((payment: Payment) => payment.balanceOfPayment > 0 ?
          this.canMakePayment = true : this.canMakePayment = false)
  }

  private getUserRole(): boolean{ 
      return this.authService.isUserAdministrator()
  }

  public continueToPaymentsList(): void {
    this.isCustomerOwing = false
    this.canMakePayment = true
  }

  ngOnDestroy(): void {
    this.subscriptionService.remove()
  }


}
