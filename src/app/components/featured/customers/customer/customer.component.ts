import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { PaymentError } from 'src/app/interface/paymentError.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { PaymentService } from 'src/app/service/payments/payments.service';
import { PaymentHelperService } from 'src/app/service/payments/paymentsHelper.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ PaymentService, PaymentHelperService ]
})


export class CustomerComponent implements OnInit {

  @ViewChild('paymentForm') paymentForm!: NgForm;

  public customer: Customer | any = {};
  public customerId!: string;
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

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private paymentHelperService: PaymentHelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.route.params.subscribe((params: Params) => this.customerId = params['id'])
    return this.customerService.findCustomerById(this.customerId).subscribe(customer => {
      this.customer = customer
      this.handleCustomerDebts(customer)
      this.setTotalAndBalancePayments(customer)
    })
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
       this.paymentHelperService.updatePayments( this.customerId, this.customer.payments )
    }
  }


  continueToPaymentsList(): void {
    this.isCustomerOwing = false
    this.canMakePayment = true

  }

  cancelButton() {
    this.router.navigateByUrl('/customers')
  }



}
