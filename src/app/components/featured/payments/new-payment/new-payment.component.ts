import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { PaymentError } from 'src/app/interface/paymentError.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { PaymentHelperService } from 'src/app/service/payments/paymentsHelper.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit{

  // @ViewChild('paymentForm') paymentForm!: NgForm;


   @Input('customer') customer: any;
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

  constructor(private paymentHelperService: PaymentHelperService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.setTotalAndBalancePayments(this.customer)
    }, 2000)
  }


  private setTotalAndBalancePayments(customer: Customer) {
    const $payment = this.paymentHelperService.getTotalAndBalance(customer)
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
