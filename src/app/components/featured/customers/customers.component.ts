import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})


export class CustomersComponent implements OnInit {

  customers: Array<Customer> = [];
  searchTerm: string  = '';
  selectFilterBy: string = 'names'
  searchFieldPlaceHolder: string = ''

  constructor(private customerService: CustomerService ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.updateSearchPlaceholder();
  }

  getAllCustomers(){
    return this.customerService.findAll().subscribe( (response: Customer[]) => this.customers = response )
  }

  updateSearchPlaceholder(): void{
   this.searchFieldPlaceHolder = `search customers by ${this.selectFilterBy}`
  }


}
