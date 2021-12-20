import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.css']
})
export class StatusCardsComponent implements OnInit {

  customerCount: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomersCounts();
  }



  getCustomersCounts() {
    return this.customerService.findAll().subscribe((customers: Array<Customer>) => {
      this.updateCustomersStatus(customers)
    });
  }

  updateCustomersStatus(customers: Array<Customer>) {
    return (this.customerCount = customers.length);
  }

 

}
