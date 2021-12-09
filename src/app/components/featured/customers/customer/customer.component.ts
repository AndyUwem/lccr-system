import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
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

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   
    this.getCustomerById()
  }

  getCustomerById() {
     this.getIdParams()
     return this.customerService.findCustomerById(this.customerId).subscribe( responseData => this.customer = responseData)
  }

  getIdParams(){
   return this.route.params.subscribe((params: Params) => this.customerId = params['id'])
  }

  cancelButton(){
    this.router.navigateByUrl('/customers')
   }


}
