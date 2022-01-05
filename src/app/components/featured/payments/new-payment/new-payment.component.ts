import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from 'src/app/interface/payment.interface';
import { PaymentError } from 'src/app/interface/paymentError.interface';
import { PaymentHelperService } from 'src/app/service/payments/paymentsHelper.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit{



   @Input('payments') payments!: Payment[];
   @Output('payment') updatedPaymentRef: EventEmitter<Payment> =  new EventEmitter<Payment>();

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
    setTimeout(() => {
      this.setTotalAndBalancePayments(this.payments) 
      this.isLoading = false       
    }, 2000)
  }


  private setTotalAndBalancePayments(payments: Payment[]) {
    const $payment = this.paymentHelperService.getTotalAndBalance(payments)
    this.newPayment.totalPayment = $payment.total
    this.newPayment.balanceOfPayment = $payment.balance
    this.initialBalanceOfPayment = $payment.balance
  }


  onBalanceOfPaymentChange(): void {
    this.paymentHelperService.validateBalanceOfPayment(
      this.newPayment, this.initialBalanceOfPayment, this.paymentError)

     this.updatedPaymentRef.emit(this.newPayment)
  }




}
