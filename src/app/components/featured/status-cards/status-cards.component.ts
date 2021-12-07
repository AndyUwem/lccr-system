import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.css'],
  providers: [CustomerService],
})
export class StatusCardsComponent implements OnInit {
  customers: any = [];
  customerCount: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomersCounts();
  }



  getCustomersCounts() {
    return this.customerService.findAll().subscribe((customers) => {
      this.customers = customers;
    });
  }

  updateCustomersStatus(customers: any) {
    return (this.customerCount = customers.length);
  }

 

}
