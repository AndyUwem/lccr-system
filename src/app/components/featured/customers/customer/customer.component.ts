import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cloth } from 'src/app/interface/cloth.interface';

import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {

  public customer: any = {};
  public customerId!: string;



  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.route.params.subscribe((params: Params) => this.customerId = params['id'])
    return this.customerService.findCustomerById(this.customerId).subscribe(customer => {
      this.customer = customer
    })
  }

  getCustomerCloths(): Cloth[]{
    return this.customer.cloths
  }

  cancelButton() {
    this.router.navigateByUrl('/customers')
  }



}
