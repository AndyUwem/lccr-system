import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any = [];
  searchTerm  = '';
  selectFilterBy = 'names'
  searchFieldPlaceHolder = ''

  constructor(private customerService: CustomerService ) { }

  ngOnInit(): void {

    this.getAllCustomers();
    this.updateSearchPlaceholder();
  }

  getAllCustomers() {
    return this.customerService.findAll().subscribe( response => this.customers = response )
  }

  updateSearchPlaceholder(){
   this.searchFieldPlaceHolder = `search customers by ${this.selectFilterBy}`
  }


}
