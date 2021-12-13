import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  public customer = <Customer>{}
  public customerId: string = ''
  public isCustomerOwing: boolean = false

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.getIdParams()
    return this.customerService.findCustomerById(this.customerId).subscribe(responseData => {
      this.customer = responseData
      this.checkCustomerDebts(this.customer)
    })
  }

  getIdParams() {
    return this.route.params.subscribe((params: Params) => this.customerId = params['id'])
  }

  checkCustomerDebts(customer: Customer): void {

    customer.payments.filter((payment: Payment) => payment.balanceOfPayment > 0 ?
      this.isCustomerOwing = true : this.isCustomerOwing = false)

  }

  goToPaymentsList(): void {
    this.isCustomerOwing = false
  }

  cancelButton() {
    this.router.navigateByUrl('/customers')
  }


}
