import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

   customers: any = []

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers()
  }

   getAllCustomers(){
     return this.customerService.findAll().subscribe( 
           response =>  this.customers = response)
   }

}
