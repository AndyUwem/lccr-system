import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { CustomerService } from 'src/app/service/customers.service';
import { PaymentService } from 'src/app/service/payments.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [PaymentService]
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

  public paymentExceedError = { 
    isAmountExceed: false, 
    errorMassage: ''
  }

  constructor(private customerService: CustomerService,
              private route: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.getIdParams()
    return this.customerService.findCustomerById(this.customerId).subscribe(customer => {
      this.customer = customer

      this.handleCustomerDebts(customer)
      this.setTotalAndBalancePayments(customer)
    })
  }

  getIdParams() {
    return this.route.params.subscribe((params: Params) => this.customerId = params['id'])
  }

  handleCustomerDebts(customer: Customer): void {
    customer.payments.filter((payment: Payment) => payment.balanceOfPayment > 0 ?
      this.isCustomerOwing = true : this.isCustomerOwing = false)
  }

  setTotalAndBalancePayments(customer: Customer): void{
    let $payment = { total: 0,  balance: 0 };
     customer.payments.forEach( ( payment: Payment ) => { 
      $payment.total = payment.totalPayment;
      $payment.balance = payment.balanceOfPayment  
      })

     this.newPayment.totalPayment =  $payment.total
     this.newPayment.balanceOfPayment = $payment.balance
     this.initialBalanceOfPayment =  $payment.balance
  }

  onBalanceOfPaymentChange(): void{
    let initBalance = Number(this.initialBalanceOfPayment)
    let amountPaid = Number(this.newPayment.amountPaid)

   if(!amountPaid){
    this.newPayment.balanceOfPayment = initBalance
   }
   
   else{
        const calculateBlance = initBalance - amountPaid

        if(amountPaid > initBalance){ 
        this.newPayment.balanceOfPayment = initBalance
        this.paymentExceedError.isAmountExceed = true
          this.paymentExceedError.errorMassage = `this customer can not pay more than: N${this.initialBalanceOfPayment}!`
        }

        else{
          this.paymentExceedError.isAmountExceed = false
          this.newPayment.balanceOfPayment = calculateBlance
          }

     }
 
  }
 
   createNewPayment(payment: any): Payment{

     return {  
      date: payment.date,
      amountPaid: parseInt(payment.amountPaid),
      balanceOfPayment: parseInt(payment.balanceOfPayment),
      totalPayment: parseInt(payment.totalPayment)
    }

   }
  

   updatePayment(): void{
     if(this.paymentForm.valid){
        this.customer.payments.push(this.createNewPayment(this.newPayment))
        console.log(this.customer.payments)
        this.paymentService.updatePayment(this.customerId, this.customer.payments).subscribe( responseData => console.log(responseData))
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
