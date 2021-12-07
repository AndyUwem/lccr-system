import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  customer = <Customer>{}

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomerById()
  }

  getCustomerById() {
     return this.customerService.findCustomerById('-Mq51Ghk623IHrKKHpKd').subscribe( responseData => {
       console.log(responseData)
       this.customer = responseData
     } )
  }

   
}
