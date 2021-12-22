import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Payment } from 'src/app/interface/payment.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { PaymentError } from 'src/app/interface/paymentError.interface';
import { PaymentHelperService } from 'src/app/service/payments/paymentsHelper.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  @ViewChild('paymentForm') paymentForm!: NgForm;
  @Input('customer') customer: any;
  @Input('customerId') customerId!: string;
  

  public isLoading: boolean = true
  public isCustomerOwing: boolean = false
  public canMakePayment: boolean = false
  private initialBalanceOfPayment!: number;

  public newPayment: Payment = {
    amountPaid: 0,
    balanceOfPayment: 0,
    date: new Date().toUTCString(),
    totalPayment: 0
  }

  public paymentError: PaymentError = {
    isAmountExceed: false,
    errorMassage: ''
  };

  constructor(private paymentHelperService: PaymentHelperService) { }

  ngOnInit(): void {
    this.refreshPaymentsList()
  }

refreshPaymentsList(): void {
  setTimeout(() => {
    this.isLoading = false
     this.handleCustomerDebts(this.customer)
     this.setTotalAndBalancePayments(this.customer)
   }, 3000)
}


  handleCustomerDebts(customer: Customer): void {
    customer.payments.filter((payment: Payment) => payment.balanceOfPayment > 0 ?
     this.isCustomerOwing = true : this.isCustomerOwing = false)
  }


  setTotalAndBalancePayments(customer: Customer) {
    const $payment = this.paymentHelperService.getTotalAndBalance(customer)
    this.newPayment.totalPayment = $payment.total
    this.newPayment.balanceOfPayment = $payment.balance
    this.initialBalanceOfPayment = $payment.balance
  }


  onBalanceOfPaymentChange(): void {
    this.paymentHelperService.validateBalanceOfPayment(
      this.newPayment, this.initialBalanceOfPayment, this.paymentError)
  }


  updatePayment(): void {
    if (this.paymentForm.valid) {
      this.customer.payments.push(this.paymentHelperService.createNewPayment(this.newPayment))
      this.paymentHelperService.updatePayments(this.customerId, this.customer.payments)
      this.setTotalAndBalancePayments(this.customer)
      this.newPayment.amountPaid = 0
    }
    if(!this.isCustomerOwing)
    this.customer.payments.filter((payment: Payment) => payment.balanceOfPayment > 0 ?
    this.canMakePayment = true : this.canMakePayment = false )
  }

  continueToPaymentsList(): void {
    this.isCustomerOwing = false
    this.canMakePayment = true
  }

}
