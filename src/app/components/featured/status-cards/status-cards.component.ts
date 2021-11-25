import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
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

  clock: string = '';
  attendantName: string = 'BobCat'

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomersCounts();

    interval(1000).subscribe((t: number) => {
      this.handleTime();
    });
  }

  getCustomersCounts() {
    return this.customerService.findAll().subscribe((customers) => {
      this.customers = customers;
      console.log(this.updateCustomersStatus(customers));
    });
  }

  updateCustomersStatus(customers: any) {
    return (this.customerCount = customers.length);
  }

  handleTime() {
    let currentClock = new Date(),
      hours = currentClock.getHours(),
      minutes = currentClock.getMinutes(),
      seconds = currentClock.getSeconds(),
      clockWeather = '',
      greetings = '';

    if (hours > 11) {
      clockWeather = 'PM';
      greetings = `Good Afternoon! ${this.attendantName}`;
    } else {
      clockWeather = 'AM';
      greetings = `Good Morning! ${this.attendantName}`;
    };

    return (this.clock = `${greetings}      ( ${hours}:${minutes}:${seconds} ${clockWeather} )`);
  }
}
